import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, ButtonGroup, Container, Table } from "react-bootstrap";
import Styled from "./usePageTable.module.scss";

interface usePageTableProps<T> {
  /**
   * 最初のページ
   */
  page?: number;
  /**
   * ページのサイズ
   */
  pageSize?: number;
  /**
   * コラム
   */
  columns: ColumnDef<T>[];
  getPage: (
    page: number,
    pageSize: number
  ) => Promise<{
    items: T[];
    totalCount: number;
    hasNext: boolean;
  }>;
}

const usePageTable = <T,>(
  props: usePageTableProps<T>
): [JSX.Element, number, React.Dispatch<React.SetStateAction<number>>] => {
  const [page, setPage] = useState(props.page ?? 1);
  const [pageSize] = useState(props.pageSize ?? 10);
  const [data, setData] = useState<{ [name: number]: Array<T> }>({});
  const [totalLen, setTotalLen] = useState(0);
  const [, setHasNext] = useState(false);
  const tableData = useMemo(() => {
    return data[page] ?? [];
  }, [data, page]);
  const columns = useMemo(() => {
    return props.columns;
  }, [props.columns]);
  const table = useReactTable<T>({
    data: tableData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const lastPageNum = useMemo(() => {
    return Math.ceil(totalLen / pageSize);
  }, [pageSize, totalLen]);
  const getCanPreviousPage = useCallback(() => {
    return page > 1;
  }, [page]);
  const getCanNextPage = useCallback(() => {
    return page < lastPageNum;
  }, [lastPageNum, page]);
  useEffect(() => {
    (async () => {
      const res = await props.getPage(page, pageSize);
      setTotalLen(res.totalCount);
      setHasNext(res.hasNext);
      setData((prev) => {
        prev[page] = res.items;
        return prev;
      });
    })();
  }, [data, page, pageSize, props]);
  return [
    useMemo(
      () => (
        <>
          <Container>
            <Table striped bordered className={Styled.table}>
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
                onClick={() => setPage(1)}
                disabled={!getCanPreviousPage()}
              >
                {"<<"}
              </Button>
              <Button
                variant="dark"
                onClick={() => setPage(page - 1)}
                disabled={!getCanPreviousPage()}
              >
                {"<"}
              </Button>
            </ButtonGroup>
            <div style={{ margin: "5px" }}>
              <span>Page</span>
              <strong>
                {page}
                {" of "}
                {lastPageNum}
              </strong>
            </div>
            <ButtonGroup>
              <Button
                variant="dark"
                onClick={() => setPage(page + 1)}
                disabled={!getCanNextPage()}
              >
                {">"}
              </Button>
              <Button
                variant="dark"
                onClick={() => setPage(lastPageNum)}
                disabled={!getCanNextPage()}
              >
                {">>"}
              </Button>
            </ButtonGroup>
          </Container>
        </>
      ),
      [getCanNextPage, getCanPreviousPage, lastPageNum, page, table]
    ),
    totalLen,
    setPage,
  ];
};

export default usePageTable;
