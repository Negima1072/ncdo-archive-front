import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ReserveList = () => {
  const [videos, setVideos] = useState<ReserveData[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://api.ncdo.net/v1/archive/list?status=0&pageSize=3&page=1`
        );
        if (res.status === 200) {
          const resJson = await res.json();
          if (resJson.meta.status === 200) {
            setVideos(
              resJson.data.items.map((v: ListItem): ReserveData => {
                return {
                  id: v.id,
                  title: v.videoTitle ?? v.videoId,
                  videoId: v.videoId,
                  requestedAt: v.requestedAt,
                };
              })
            );
          }
        }
      } catch (error) {
        toast.error("エラーが発生しました", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
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
            <td>{v.requestedAt}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ReserveList;
