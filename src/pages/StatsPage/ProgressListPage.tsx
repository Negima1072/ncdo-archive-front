import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Form,
  InputGroup,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Styled from "./ProgressListPage.module.scss";

const ProgressListPage = () => {
  const [videos, setVideos] = useState<ProgressData[]>([]);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const lastPage = useMemo(() => {
    return Math.ceil(totalSize / 10);
  }, [totalSize]);
  const canNextPage = useMemo(() => {
    return lastPage > page;
  }, [lastPage, page]);
  const canPreviousPage = useMemo(() => {
    return 1 < page;
  }, [page]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://api.ncdo.net/v1/archive/list?status=1&pageSize=10&page=${page}`
        );
        if (res.status === 200) {
          const resJson = await res.json();
          if (resJson.meta.status === 200) {
            setTotalSize(resJson.data.totalCount);
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
      } catch (error) {
        toast.error("エラーが発生しました", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    })();
  }, [page]);
  return (
    <>
      <h2>処理中一覧</h2>
      <Container className={Styled.searchCnt}>
        <p>処理中動画数: {totalSize}</p>
        <InputGroup size="sm" className={Styled.searchInput}>
          <Form.Control type="text" />
          <Button variant="dark" type="submit">
            検索
          </Button>
        </InputGroup>
      </Container>
      <Container>
        <Table striped bordered className={Styled.videoTable}>
          <thead>
            <th>#</th>
            <th>動画名</th>
            <th>動画ID</th>
            <th>コメント数</th>
            <th>登録日時</th>
          </thead>
          <tbody>
            {videos.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>
                  <Link to={`/video/${v.id}`}>{v.title}</Link>
                </td>
                <td>{v.id}</td>
                <td>
                  `${v.comment.now}/${v.comment.total}`
                </td>
                <td>{v.requestedAt}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Container className={Styled.pageButton}>
        <ButtonGroup>
          <Button
            variant="dark"
            onClick={() => setPage(1)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </Button>
          <Button
            variant="dark"
            onClick={() => setPage(page - 1)}
            disabled={!canPreviousPage}
          >
            {"<"}
          </Button>
        </ButtonGroup>
        <div style={{ margin: "5px" }}>
          <span>Page</span>
          <strong>
            {page}
            {" of "}
            {lastPage}
          </strong>
        </div>
        <ButtonGroup>
          <Button
            variant="dark"
            onClick={() => setPage(page + 1)}
            disabled={!canNextPage}
          >
            {">"}
          </Button>
          <Button
            variant="dark"
            onClick={() => setPage(lastPage)}
            disabled={!canNextPage}
          >
            {">>"}
          </Button>
        </ButtonGroup>
      </Container>
    </>
  );
};

export default ProgressListPage;
