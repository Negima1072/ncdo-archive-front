import CommentList from "components/CommentList/CommentList";
import React, { useEffect, useState } from "react";
import { Badge, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Styled from "./VideoDetailPage.module.scss";

const VideoDetailPage = () => {
  const { progressId } = useParams();
  const [progressInfo, setProgressInfo] = useState<ListItem>();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://api.ncdo.net/v1/archive/info?progressId=${progressId}`,
          {
            mode: "cors",
          }
        );
        if (res.status === 200) {
          const resJson = await res.json();
          if (resJson.meta.status === 200) {
            setProgressInfo(resJson.data.video);
          }
        }
      } catch (error) {
        toast.error("エラーが発生しました", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    })();
  }, [progressId, setProgressInfo]);
  return (
    <>
      {progressInfo === undefined ? (
        <>
          <h2 style={{ margin: 0 }}>Not Found</h2>
          <p>このページには何もありません。</p>
        </>
      ) : (
        <div className={Styled.videoDetail}>
          <div className={Styled.videoMeta}>
            <h2 className={Styled.title}>
              {progressInfo.videoTitle}({progressInfo.videoId}){" "}
              {progressInfo.status === 3 && <Badge bg="success">Success</Badge>}
              {progressInfo.status === 2 && <Badge bg="danger">Error</Badge>}
              {progressInfo.status === 1 && <Badge bg="primary">Running</Badge>}
              {progressInfo.status === 0 && (
                <Badge bg="secondary">Waiting</Badge>
              )}
            </h2>
            <iframe
              className={Styled.embedFrame}
              src={`https://ext.nicovideo.jp/thumb/${progressInfo.videoId}`}
              title={progressInfo.videoId}
            >
              <a
                href={`https://www.nicovideo.jp/watch/${progressInfo.videoId}`}
                target="_blank"
                rel="noreferrer"
              >
                {progressInfo.videoTitle}
              </a>
            </iframe>
            <Table striped bordered>
              <tbody>
                <tr>
                  <th>処理ID</th>
                  <td>{progressInfo.id}</td>
                </tr>
                <tr>
                  <th>タイトル</th>
                  <td>{progressInfo.videoTitle}</td>
                </tr>
                <tr>
                  <th>動画ID</th>
                  <td>
                    <a
                      href={`https://nico.ms/${progressInfo.videoId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {progressInfo.videoId}
                    </a>
                  </td>
                </tr>
                <tr>
                  <th>投稿者ID</th>
                  <td>
                    <a
                      href={`https://nico.ms/user/${progressInfo.userId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      user/{progressInfo.userId}
                    </a>
                  </td>
                </tr>
                <tr>
                  <th>動画タイプ</th>
                  <td>{progressInfo.videoType}</td>
                </tr>
                <tr>
                  <th>登録日時</th>
                  <td>{progressInfo.requestedAt}</td>
                </tr>
                <tr>
                  <th>更新日時</th>
                  <td>{progressInfo.updatedAt}</td>
                </tr>
                <tr>
                  <th>コメント数</th>
                  <td>
                    {progressInfo.count.nowComment}/
                    {progressInfo.count.totalComment}
                  </td>
                </tr>
                <tr>
                  <th>メタデータ</th>
                  <td>
                    再生数: {`${progressInfo.count.view} `}
                    マイリス数: {`${progressInfo.count.mylist} `}
                    いいね数: {`${progressInfo.count.like} `}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className={Styled.videoComment}>
            <CommentList videoId={progressInfo.videoId} />
          </div>
        </div>
      )}
    </>
  );
};

export default VideoDetailPage;
