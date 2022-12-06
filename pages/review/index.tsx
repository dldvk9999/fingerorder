import Image from "next/image";
import { useRecoilState } from "recoil";
import { editNumber } from "../../states";
import reviews from "../../data/reviews";
import LoginCheck from "../login_check";
import styles from "../../styles/pages/Review.module.scss";
import { useEffect, useState } from "react";

type reviewTmp = {
    name: string;
    time: string;
    comment: string;
    reply: string;
};

export default function Review() {
    const [storeID, _] = useRecoilState(editNumber);
    const [review, setReview] = useState<any>([]);
    const [tmpReview, setTmpReview] = useState<reviewTmp>();
    const [tmpReviewIndex, setTmpReviewIndex] = useState(-1);
    const [reply, setReply] = useState("");

    // 아이콘 이미지 출력
    function reviewImages(type: string) {
        return (
            <Image
                src={"/" + type + ".webp"}
                alt={type}
                width={50}
                height={50}
                priority
                className={`${styles.reviewListImage} ${type === "reply" && styles.reviewListReplyImage}`}
            />
        );
    }

    // 사장님이 답글 달기 버튼 클릭했을 때 - input 창 열림
    function onclickReply(index: number) {
        setReply("");
        setTmpReview(review[index]);
        setTmpReviewIndex(index);
        document.querySelector("." + styles.reviewList)?.scrollIntoView({
            behavior: "smooth",
        });
    }

    // 사장님이 답글 등록 버튼 클릭했을 때 - input 값에 내용을 저장
    function inputReply() {
        let tmp = review;
        tmp[tmpReviewIndex].reply = reply;
        setReview(tmp);
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
                                {reviewIndex !== -1 ? review[reviewIndex].name : tmpReview!.name}
                                <span>{reviewIndex !== -1 ? review[reviewIndex].time : tmpReview!.time}</span>
                            </p>
                            <p>{reviewIndex !== -1 ? review[reviewIndex].comment : tmpReview!.comment}</p>
                        </>
                    ) : (
                        <>
                            {review && review[reviewIndex].reply ? (
                                <>
                                    <p>사장님</p>
                                    <pre>{review[reviewIndex].reply}</pre>
                                </>
                            ) : (
                                <button onClick={() => onclickReply(reviewIndex)} className={styles.reviewListReplyBtn}>
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
        let result = [];
        for (let i = 0; i < review.length; i++) {
            result.push(
                <div className={styles.reviewListItem} key={"review-item-" + i}>
                    <hr />
                    {printReviewItem("profile", i)}
                    <hr />
                    {printReviewItem("reply", i)}
                </div>
            );
        }
        return result;
    }

    useEffect(() => {
        // 마이페이지를 통해 접근했는지 확인
        if (storeID === -1) {
            alert("마이페이지를 통해 접근해주세요.");
            location.href = "/mypage";
        } else {
            setReview(reviews[storeID].review);
        }
    }, []);

    useEffect(() => {
        // 답글 달기 버튼을 클릭하여 Input 창이 생길 때 모바일에서는 창이 생겼는지 모를 수 있으므로 auto scroll 처리
        document.querySelector("." + styles.reviewInput)?.scrollIntoView({
            behavior: "smooth",
        });
    }, [tmpReview]);

    return LoginCheck() ? (
        <main>
            <section className={styles.review}>
                <h1>매장 리뷰</h1>
                <div>
                    <div className={styles.reviewList}>
                        {review.length ? printReviewList() : <p className={styles.reviewNoExist}>리뷰가 없습니다.</p>}
                    </div>
                    {tmpReview && printReviewInput()}
                </div>
            </section>
        </main>
    ) : null;
}
