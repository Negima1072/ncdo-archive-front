import React, { useEffect, useMemo, useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import DataGrid, { Column, SelectCellFormatter } from "react-data-grid";
import "react-data-grid/lib/styles.css";
import { toast } from "react-toastify";
import Styled from "./CommentList.module.scss";

interface CommentListProps {
  videoId: string;
}

const vpos2time = (vpos: number) => {
  return `${String(Math.floor(vpos / 6000)).padStart(2, "0")}:${String(
    Math.floor((vpos % 6000) / 100)
  ).padStart(2, "0")}.${String(Math.floor((vpos % 6000) % 100)).padStart(
    2,
    "0"
  )}`;
};

const rowKeyGetter = (row: CommentData) => {
  return row.no;
};

const getColumns = (): readonly Column<CommentData>[] => {
  return [
    {
      key: "no",
      name: "No",
      width: 50,
      resizable: true,
    },
    {
      key: "vpos",
      name: "Time",
      width: 70,
      resizable: true,
      formatter: (p) => {
        return vpos2time(p.row.vpos);
      },
    },
    {
      key: "score",
      name: "Score",
      width: 70,
      resizable: true,
    },
    {
      key: "content",
      name: "Comment",
      width: 350,
      resizable: true,
      formatter: (p) => {
        return <div title={p.row.content}>{p.row.content}</div>;
      },
    },
    {
      key: "mail",
      name: "Commands",
      width: 200,
      resizable: true,
    },
    {
      key: "nicoru",
      name: "Nicoru",
      width: 50,
      resizable: true,
    },
    {
      key: "date",
      name: "Date",
      width: 200,
      resizable: true,
      formatter: (p) => {
        return (
          <>
            {new Date(
              (p.row.date * 1000000 + p.row.date_usec) / 1000
            ).toLocaleString()}
          </>
        );
      },
    },
    {
      key: "premium",
      name: "Premium",
      width: 60,
      resizable: false,
      formatter: (p) => {
        return (
          <SelectCellFormatter
            value={p.row.premium}
            isCellSelected={p.isCellSelected}
            onChange={() =>
              p.onRowChange({ ...p.row, premium: !p.row.premium })
            }
          />
        );
      },
    },
    {
      key: "user_id",
      name: "UserID",
      width: 200,
      resizable: true,
    },
  ];
};

const EmptyRowsRenderer = () => {
  return (
    <div style={{ textAlign: "center", gridColumn: "1/-1" }}>
      Nothing to show{" "}
      <span lang="ja" title="ショボーン">
        (´・ω・`)
      </span>
    </div>
  );
};

const CommentList = (props: CommentListProps) => {
  const columns = useMemo(
    (): readonly Column<CommentData>[] => getColumns(),
    []
  );
  const [comments, setComments] = useState<CommentData[]>([]);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const lastPage = useMemo(() => {
    return Math.ceil(totalSize / 1000);
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
          `https://api.ncdo.net/v1/archive/comment?videoId=${props.videoId}&pageSize=1000&page=${page}`
        );
        if (res.status === 200) {
          const resJson = await res.json();
          if (resJson.meta.status === 200) {
            setTotalSize(resJson.data.totalCount);
            setComments(resJson.data.items);
          }
        }
      } catch (error) {
        toast.error("エラーが発生しました", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    })();
  }, [page, props.videoId]);
  return (
    <div className={Styled.commentList}>
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
      <div className={Styled.commentListMain}>
        <DataGrid
          className={`rdg-light ${Styled.datagrid}`}
          rowKeyGetter={rowKeyGetter}
          columns={columns}
          rows={comments}
          defaultColumnOptions={{
            sortable: true,
            resizable: true,
          }}
          renderers={{ noRowsFallback: <EmptyRowsRenderer /> }}
        />
      </div>
    </div>
  );
};

export default CommentList;
