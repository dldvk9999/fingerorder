import Image from "next/image";
import reviews from "../../data/reviews";
import LoginCheck from "../login_check";
import styles from "../../styles/pages/Review.module.scss";
import { useEffect, useState } from "react";

type review = {
    id: number
}
type reviewTmp = {
    name: string;
    time: string;
    comment: string;
}

export default function Review({id=1}: review) {
    const [review, setReview] = useState<any>();
    const [tmpReview, setTmpReview] = useState<reviewTmp>();

    // 리뷰 입력 부분 출력
    function printReviewInput() {
        return (
            <div className={styles.reviewInput}>
                <hr />
                <div className={styles.reviewListUserProfile}>
                    <Image src={"/profile.webp"} alt={"profile"} width={50} height={50} priority className={styles.reviewListImage} />
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
                <input type="text" className={styles.reviewInputArea}/>
            </div>
        )
    }

    // 리뷰 리스트 출력
    function printReviewList() {
        let result = [];
        for(let i=0; i<review.length; i++) {
            result.push(
                <div className={styles.reviewListItem} key={"review-item-" + i}>
                    <hr />
                    <div className={styles.reviewListUserProfile}>
                        <Image src={"/profile.webp"} alt={"profile"} width={50} height={50} priority className={styles.reviewListImage} />
                        <div className={styles.reviewListUserInfo}>
                            {review && (
                                <>
                                    <p>{review[i].name}</p>
                                    <p>{review[i].time}</p>
                                    <p>{review[i].comment}</p>
                                </>
                            )}
                        </div>
                    </div>
                    <hr />
                    <div className={styles.reviewListUserProfile}>
                        <Image src={"/reply.webp"} alt={"reply"} width={50} height={50} priority className={`${styles.reviewListReplyImage} ${styles.reviewListImage}`} />
                        {(review && review[i].reply) ? (
                            <div className={styles.reviewListUserInfo}>
                                <p>사장님</p>
                                <p>{review[i].reply}</p>
                            </div>
                        ) : (
                            <div className={styles.reviewListUserInfo}>
                                <button onClick={() => setTmpReview(review[i])} className={styles.reviewListReplyBtn}>답글 달기</button>
                            </div>
                        )}
                    </div>
                </div>
            )
        }
        return result;
    }

    useEffect(() => {
        setReview(reviews[id - 1].review);
    }, [])

    return LoginCheck() ? (
        <main>
            <section className={styles.review}>
                <h1>매장 리뷰</h1>
                <div>
                    <div className={styles.reviewList}>
                        {review && printReviewList()}
                    </div>
                    {tmpReview && (printReviewInput())}
                </div>
            </section>
        </main>
    ) : null;
}
