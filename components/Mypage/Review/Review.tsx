import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { editNumber, isDarkmode } from "../../../states";
import LoginCheck from "../../common/Login_Check";
import Img from "../../common/Img";
import { reviewTmp } from "../../../types/type";
import { editReview, deleteReview, getReview, createReview } from "./ReviewAPI";
import styles from "./Review.module.scss";

export default function Review() {
    const [storeID] = useRecoilState(editNumber);
    const [darkmode] = useRecoilState<boolean>(isDarkmode);
    const [review, setReview] = useState<Array<any>>([]);
    const [tmpReview, setTmpReview] = useState<reviewTmp>();
    const [tmpReviewIndex, setTmpReviewIndex] = useState(-1);
    const [reviewId, setReviewId] = useState(-1);
    const [reply, setReply] = useState("");
    const [isNew, setNew] = useState(false);
    const reviewList = useRef<HTMLDivElement>(null);

    // 아이콘 이미지 출력
    function reviewImages(type: string) {
        return Img(
            type,
            50,
            50,
            `${styles.reviewListImage} ${type === "reply" && styles.reviewListReplyImage} ${
                darkmode ? styles.reviewInvert : ""
            }`
        );
    }

    // 사장님이 답글 삭제 아이콘을 클릭했을 때
    function deleteReply(index: number) {
        if (confirm("리뷰 답글을 삭제하시겠습니까?")) {
            deleteReview(storeID, index);
            alert("삭제되었습니다.");
        }
    }

    // 사장님이 답글 달기 or 수정 버튼 클릭했을 때 - input 창 열림 (재클릭시 닫힘)
    function onclickReply(index: number, isReply: string = "") {
        if (!tmpReview || tmpReview.reply !== isReply) {
            setReply(isReply ? isReply : "");
            setTmpReview(review[index].content);
            setTmpReviewIndex(index);
            setReviewId(review[index].comment ? review[index].comment.reviewId : review[index].reviewId);
            reviewList.current!.scrollIntoView({ behavior: "smooth" });
        } else {
            setReply("");
            setTmpReview(undefined);
            setTmpReviewIndex(0);
        }
    }

    // 사장님이 답글 등록 버튼 클릭했을 때 - input 값에 내용을 저장
    function inputReply() {
        let tmp = review;
        tmp[tmpReviewIndex].reply = reply;
        setReview(tmp);
        if (isNew) createReview(storeID, reviewId, reply, storeID);
        else editReview(storeID, reviewId, reply);
        setTmpReview(undefined);
        setReply("");
        setTmpReviewIndex(-1);
    }

    // Review의 Item 요소들은 재활용가능한 코드로 구현
    function printReviewItem(type: "profile" | "reply", reviewIndex: number = -1) {
        return (
            <div className={styles.reviewListUserProfile}>
                {reviewImages(type)}
                <div className={styles.reviewListUserInfo}>
                    {type === "profile" && review ? (
                        <>
                            <p>
                                {review[reviewIndex !== -1 ? reviewIndex : tmpReviewIndex].nickName}
                                <span>
                                    {new Date(
                                        review[reviewIndex !== -1 ? reviewIndex : tmpReviewIndex].createdAt
                                    ).toLocaleString()}
                                </span>
                            </p>
                            <p>{review[reviewIndex !== -1 ? reviewIndex : tmpReviewIndex].content}</p>
                        </>
                    ) : (
                        <>
                            {/* 사장님의 답글이 달려있는지 확인 */}
                            {review[reviewIndex].comment ? (
                                <>
                                    <div className={styles.reviewListManagerTitle}>
                                        <p>사장님</p>
                                        <button
                                            onClick={() => {
                                                onclickReply(reviewIndex, review[reviewIndex].comment.content);
                                                setNew(false);
                                            }}
                                        >
                                            {Img("edit", 30, 30, `${darkmode ? styles.reviewInvert : ""}`)}
                                        </button>
                                        <button onClick={() => deleteReply(review[reviewIndex].comment.reviewId)}>
                                            {Img("delete", 20, 20, `${darkmode ? styles.reviewInvert : ""}`)}
                                        </button>
                                    </div>
                                    <pre>{review[reviewIndex].comment.content}</pre>
                                </>
                            ) : (
                                <button
                                    onClick={() => {
                                        onclickReply(reviewIndex);
                                        setNew(true);
                                    }}
                                    className={styles.reviewListReplyBtn}
                                >
                                    답글 달기
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        );
    }

    // 리뷰 입력 부분 출력
    function printReviewInput() {
        return (
            <div className={styles.reviewInput}>
                <hr />
                {printReviewItem("profile")}
                <hr />
                <div className={styles.reviewListUserProfile}>
                    {reviewImages("reply")}
                    <div className={styles.reviewListManager}>
                        <textarea
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            className={styles.reviewInputArea}
                        />
                        <button onClick={inputReply} className={styles.reviewInputAreaSubmit}>
                            답글 등록
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // 리뷰 리스트 출력
    function printReviewList() {
        if (review.length) {
            return review.map((_, i) => (
                <div className={styles.reviewListItem} key={"review-item-" + i}>
                    <hr />
                    {printReviewItem("profile", i)}
                    <hr />
                    {printReviewItem("reply", i)}
                </div>
            ));
        } else {
            return <h2>리뷰가 없습니다</h2>;
        }
    }

    useEffect(() => {
        // 마이페이지를 통해 접근했는지 확인
        if (storeID === -1) {
            alert("마이페이지를 통해 접근해주세요.");
            location.href = "/mypage";
        }

        async function initReview() {
            const apiReview = await getReview(storeID);
            setReview(apiReview.data.length ? apiReview.data : []);
        }
        initReview();
    }, []);

    useEffect(() => {
        // 답글 달기 버튼을 클릭하여 Input 창이 생길 때 모바일에서는 창이 생겼는지 모를 수 있으므로 auto scroll 처리
        document.querySelector("." + styles.reviewInput)?.scrollIntoView({ behavior: "smooth" });
    }, [tmpReview]);

    return LoginCheck() ? (
        <main>
            <section className={styles.review}>
                <h1>매장 리뷰</h1>
                <div>
                    <div className={styles.reviewList} ref={reviewList}>
                        {review ? printReviewList() : <p className={styles.reviewNoExist}>리뷰가 없습니다.</p>}
                    </div>
                    {tmpReview && printReviewInput()}
                </div>
            </section>
        </main>
    ) : null;
}
