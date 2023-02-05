import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
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
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [totalSize, setTotalSize] = useState<number>(0);
  const table = useReactTable<VideoData>({
    data: videos,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://api.ncdo.net/v1/archive/list?status=3&pageSize=10&page=1`
      );
      if (res.status === 200) {
        const resJson = await res.json();
        if (resJson.meta.status === 200) {
          setTotalSize(resJson.data.totalCount);
          setVideos(
            resJson.data.items.map((v: ListItem): VideoData => {
              return {
                id: v.id,
                title: v.videoTitle ?? v.videoId,
                videoId: v.videoId,
                commentNum: v.count.nowComment,
                updatedAt: v.updatedAt ?? "",
              };
            })
          );
        }
      }
    })();
  }, []);
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
      <Container>
        <Table striped bordered className={Styled.videoTable}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <Container className={Styled.pageButton}>
        <ButtonGroup>
          <Button
            variant="dark"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
          <Button
            variant="dark"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
        </ButtonGroup>
        <div style={{ margin: "5px" }}>
          <span>Page</span>
          <strong>
            {table.getState().pagination.pageIndex + 1}
            {" of "}
            {table.getPageCount()}
          </strong>
        </div>
        <ButtonGroup>
          <Button
            variant="dark"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
          <Button
            variant="dark"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </Button>
        </ButtonGroup>
      </Container>
    </>
  );
};

export default VideoListPage;
