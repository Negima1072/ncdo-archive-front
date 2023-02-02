import React from "react"
import { Table } from "react-bootstrap";

const sampleProgress = [
  {
    id: 1,
    title: "レッツゴー陰陽師",
    videoId: "sm9",
    comment: {
      now: 1000,
      total: 10000,
    },
    status: "コメント取得中",
  },
  {
    id: 2,
    title: "レッツゴー陰陽師",
    videoId: "sm9",
    comment: {
      now: 1000,
      total: 10000,
    },
    status: "コメント取得中",
  },
  {
    id: 3,
    title: "レッツゴー陰陽師",
    videoId: "sm9",
    comment: {
      now: 1000,
      total: 10000,
    },
    status: "コメント取得中",
  },
];

const ProgressList = () => {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>動画名</th>
          <th>動画ID</th>
          <th>コメント数</th>
          <th>進行状態</th>
        </tr>
      </thead>
      <tbody>
        {sampleProgress.map((v) => (
          <tr>
            <td>{v.id}</td>
            <td>{v.title}</td>
            <td>{v.videoId}</td>
            <td>{v.comment.now + "/" + v.comment.total}</td>
            <td>{v.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default ProgressList;
