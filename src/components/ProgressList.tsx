import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProgressList = () => {
  const [videos, setVideos] = useState<ProgressData[]>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://api.ncdo.net/v1/archive/list?status=1&pageSize=3&page=1`
      );
      if (res.status === 200) {
        const resJson = await res.json();
        if (resJson.meta.status === 200) {
          setVideos(
            resJson.data.items.map((v: ListItem): ProgressData => {
              return {
                id: v.id,
                title: v.videoTitle ?? v.videoId,
                videoId: v.videoId,
                requestedAt: v.requestedAt,
                comment: {
                  now: v.count.nowComment,
                  total: v.count.totalComment,
                },
              };
            })
          );
        }
      }
    })();
  }, []);
  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>動画名</th>
          <th>動画ID</th>
          <th>コメント数</th>
          <th>登録日時</th>
        </tr>
      </thead>
      <tbody>
        {videos.map((v) => (
          <tr key={v.id}>
            <td>{v.id}</td>
            <td>
              <Link to={`/video/${v.id}`}>{v.title}</Link>
            </td>
            <td>{v.videoId}</td>
            <td>{v.comment.now + "/" + v.comment.total}</td>
            <td>{v.requestedAt}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProgressList;
