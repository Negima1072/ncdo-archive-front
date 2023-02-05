import { ColumnDef } from "@tanstack/react-table";
import usePageTable from "components/usePageTable/usePageTable";
import React, { useMemo } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Styled from "./VideoListPage.module.scss";

const COLUMNS: ColumnDef<VideoData>[] = [
  {
    header: "#",
    accessorKey: "id",
  },
  {
    header: "動画名",
    cell: (p) => {
      return (
        <Link to={`/video/${p.row.original.id}`}>{p.row.original.title}</Link>
      );
    },
  },
  {
    header: "動画ID",
    accessorKey: "videoId",
  },
  {
    header: "コメント数",
    accessorKey: "commentNum",
  },
  {
    header: "更新日時",
    accessorKey: "updatedAt",
  },
];

const VideoListPage = () => {
  const columns = useMemo(() => COLUMNS, []);
  const [Table, totalSize] = usePageTable<VideoData>({
    columns: columns,
    pageSize: 10,
    page: 1,
    getPage: async (page, pageSize) => {
      const res = await fetch(
        `https://api.ncdo.net/v1/archive/list?status=3&pageSize=${pageSize}&page=${page}`
      );
      if (res.status === 200) {
        const resJson = await res.json();
        if (resJson.meta.status === 200) {
          return {
            items: resJson.data.items.map((v: ListItem): VideoData => {
              return {
                id: v.id,
                title: v.videoTitle ?? v.videoId,
                videoId: v.videoId,
                commentNum: v.count.nowComment,
                updatedAt: v.updatedAt ?? "",
              };
            }),
            totalCount: resJson.data.totalCount,
            hasNext: resJson.data.hasNext,
          };
        }
      }
      return { items: [], totalCount: 0, hasNext: false };
    },
  });
  return (
    <>
      <h2>動画一覧</h2>
      <Container className={Styled.searchCnt}>
        <p>総動画数: {totalSize}</p>
        <InputGroup size="sm" className={Styled.searchInput}>
          <Form.Control type="text" />
          <Button variant="dark" type="submit">
            検索
          </Button>
        </InputGroup>
      </Container>
      {Table}
    </>
  );
};

export default VideoListPage;
