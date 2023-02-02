import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Form,
  InputGroup,
  Table,
} from "react-bootstrap";
import Styled from "./VideoListPage.module.scss";

interface VideoData {
  id: number;
  title: string;
  videoId: string;
  commentNum: number;
  updatedAt: string;
}

const COLUMNS: ColumnDef<VideoData>[] = [
  {
    header: "#",
    accessorKey: "id",
  },
  {
    header: "動画名",
    accessorKey: "title",
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

const sampleData: VideoData[] = [
  {
    id: 1,
    title: "レッツゴー陰陽師",
    videoId: "sm9",
    commentNum: 1000,
    updatedAt: "2020-12-10 11:30.30",
  },
  {
    id: 2,
    title: "レッツゴー陰陽師",
    videoId: "sm9",
    commentNum: 1000,
    updatedAt: "2020-12-10 11:30.30",
  },
  {
    id: 3,
    title: "レッツゴー陰陽師",
    videoId: "sm9",
    commentNum: 1000,
    updatedAt: "2020-12-10 11:30.30",
  },
  {
    id: 4,
    title: "レッツゴー陰陽師",
    videoId: "sm9",
    commentNum: 1000,
    updatedAt: "2020-12-10 11:30.30",
  },
  {
    id: 5,
    title: "レッツゴー陰陽師",
    videoId: "sm9",
    commentNum: 1000,
    updatedAt: "2020-12-10 11:30.30",
  },
  {
    id: 6,
    title: "レッツゴー陰陽師",
    videoId: "sm9",
    commentNum: 1000,
    updatedAt: "2020-12-10 11:30.30",
  },
  {
    id: 7,
    title: "レッツゴー陰陽師",
    videoId: "sm9",
    commentNum: 1000,
    updatedAt: "2020-12-10 11:30.30",
  },
  {
    id: 8,
    title: "レッツゴー陰陽師",
    videoId: "sm9",
    commentNum: 1000,
    updatedAt: "2020-12-10 11:30.30",
  },
  {
    id: 9,
    title: "レッツゴー陰陽師",
    videoId: "sm9",
    commentNum: 1000,
    updatedAt: "2020-12-10 11:30.30",
  },
  {
    id: 10,
    title: "レッツゴー陰陽師",
    videoId: "sm9",
    commentNum: 1000,
    updatedAt: "2020-12-10 11:30.30",
  },
  {
    id: 11,
    title: "レッツゴー陰陽師",
    videoId: "sm9",
    commentNum: 1000,
    updatedAt: "2020-12-10 11:30.30",
  },
];

const VideoListPage = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => sampleData, []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <>
      <h2>動画一覧</h2>
      <Container className={Styled.searchCnt}>
        <p>総動画数: {data.length}</p>
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
