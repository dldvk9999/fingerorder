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

    // 사장님이 답글달기 버튼 클릭했을 때
    function onclickReply(index: number) {
        setTmpReview(review[index]);
        setTmpReviewIndex(index);
        document.querySelector("." + styles.reviewInput)?.scrollIntoView({
            behavior: "smooth",
        });
    }

    // 사장님이 답글 달기
    function inputReply() {
        console.log(reply);
        let tmp = review;
        tmp[tmpReviewIndex].reply = reply;
        setReview(tmp);
        setTmpReview(undefined);
        setReply("");
        setTmpReviewIndex(-1);
    }

    // 리뷰 입력 부분 출력
    function printReviewInput() {
        return (
            <div className={styles.reviewInput}>
                <hr />
                <div className={styles.reviewListUserProfile}>
                    {reviewImages("profile")}
                    <div className={styles.reviewListUserInfo}>
                        {review && (
                            <>
                                <p>{tmpReview!.name}</p>
                                <p>{tmpReview!.time}</p>
                                <p>{tmpReview!.comment}</p>
                            </>
                        )}
                    </div>
                </div>
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
                    <div className={styles.reviewListUserProfile}>
                        {reviewImages("profile")}
                        <div className={styles.reviewListUserInfo}>
                            {review && (
                                <>
                                    <p>
                                        {review[i].name}
                                        <span>{review[i].time}</span>
                                    </p>
                                    <p>{review[i].comment}</p>
                                </>
                            )}
                        </div>
                    </div>
                    <hr />
                    <div className={styles.reviewListUserProfile}>
                        {reviewImages("reply")}
                        {review && review[i].reply ? (
                            <div className={styles.reviewListUserInfo}>
                                <p>사장님</p>
                                <pre>{review[i].reply}</pre>
                            </div>
                        ) : (
                            <div className={styles.reviewListUserInfo}>
                                <button onClick={() => onclickReply(i)} className={styles.reviewListReplyBtn}>
                                    답글 달기
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
        return result;
    }

    useEffect(() => {
        setReview(reviews[storeID].review);
    }, []);

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
