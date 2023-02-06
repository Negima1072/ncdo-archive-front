import KiyakuModal from "components/KiyakuModal";
import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import Styled from "./AddPage.module.scss";

const AddPage = () => {
  const [videoType, setVideoType] = useState<string>("normal");
  const [kiyakuModalShow, setKiyakuModalShow] = useState(false);
  const [searchParams] = useSearchParams();
  const [errorMes, setErrorMes] = useState("");
  const [nowReserveCount, setNowReserveCount] = useState(0);
  const navigater = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://api.ncdo.net/v1/archive/list?status=0&pageSize=3&page=1`
        );
        if (res.status === 200) {
          const resJson = await res.json();
          if (resJson.meta.status === 200) {
            setNowReserveCount(resJson.data.totalCount);
          }
        }
      } catch (error) {
        setErrorMes("エラーが発生しました。時間を開けてやり直してください。");
        return;
      }
      if (searchParams.has("videoType") || searchParams.has("videoId")) {
        if (!searchParams.has("videoType") || !searchParams.has("videoId")) {
          setErrorMes("パラメーターが不適切です。再度やり直してください。");
          return;
        }
        const videoQueryType = searchParams.get("videoType");
        if (videoQueryType !== "normal" && videoQueryType !== "deleted") {
          setErrorMes("パラメーターが不適切です。再度やり直してください。");
          return;
        }
        try {
          const res = await fetch("https://api.ncdo.net/v1/archive/add", {
            method: "post",
            mode: "cors",
            body: JSON.stringify({
              videoType: videoQueryType,
              videoId: searchParams.get("videoId"),
              videoTitle:
                videoQueryType !== "normal"
                  ? searchParams.get("videoTitle")
                  : null,
              userId:
                videoQueryType !== "normal"
                  ? Number(searchParams.get("userId"))
                  : null,
              count: {
                view:
                  videoQueryType !== "normal"
                    ? Number(searchParams.get("videoViewCount"))
                    : null,
                mylist:
                  videoQueryType !== "normal"
                    ? Number(searchParams.get("videoMylistCount"))
                    : null,
                like:
                  videoQueryType !== "normal"
                    ? Number(searchParams.get("videoLikeCount"))
                    : null,
              },
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const resJson = await res.json();
          if (resJson.meta.status === 400) {
            if (resJson.meta.errorMes === "ALREADY_EXIST") {
              setErrorMes("すでに動画が存在しています。");
            } else {
              setErrorMes(
                "サーバーでエラーが発生しました。時間を開けてやり直してください。"
              );
            }
            return;
          }
          if (resJson.meta.status !== 202) {
            setErrorMes(
              "サーバーでエラーが発生しました。時間を開けてやり直してください。"
            );
            return;
          }
          navigater(`/video/${resJson.data.id}`);
          return;
        } catch (error) {
          setErrorMes("エラーが発生しました。時間を開けてやり直してください。");
          return;
        }
      }
    })();
  }, [navigater, searchParams]);
  return (
    <>
      <h2>追加</h2>
      <p>
        コメント取得のリクエストをします。以下のフォームを記入し送信してください。
        逐次リクエストの処理が行われます。
        <br />
        削除動画は新米鯖移行後に削除された動画のみ取得できます。
        <br />
        現在の追加待ち動画数は{nowReserveCount}件です。
      </p>
      {errorMes !== "" && <Alert variant="danger">{errorMes}</Alert>}
      <Form>
        <Form.Group className="mb-3">
          <Form.Check
            checked={videoType === "normal"}
            onChange={(e) => setVideoType(e.target.value)}
            value="normal"
            inline
            label="通常動画"
            name="videoType"
            type="radio"
          />
          <Form.Check
            checked={videoType === "deleted"}
            onChange={(e) => setVideoType(e.target.value)}
            value="deleted"
            inline
            label="削除動画"
            name="videoType"
            type="radio"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>動画ID</Form.Label>
          <Form.Control name="videoId" type="text" placeholder="sm9" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>動画タイトル</Form.Label>
          <Form.Control
            disabled={videoType === "normal"}
            name="videoTitle"
            type="text"
            placeholder="レッツゴー陰陽師"
          />
          <Form.Text muted>
            削除動画を選択する場合、極力動画タイトルを記載してください。
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ユーザーID</Form.Label>
          <InputGroup>
            <InputGroup.Text>user/</InputGroup.Text>
            <Form.Control
              disabled={videoType === "normal"}
              name="userId"
              type="text"
              placeholder="4"
            />
          </InputGroup>
          <Form.Text muted>
            削除動画を選択する場合、極力投稿者のユーザーIDを記載してください。
          </Form.Text>
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>最終再生数</Form.Label>
            <Form.Control
              disabled={videoType === "normal"}
              name="videoViewCount"
              type="number"
              placeholder="10000"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>最終マイリスト数</Form.Label>
            <Form.Control
              disabled={videoType === "normal"}
              name="videoMylistCount"
              type="number"
              placeholder="10000"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>最終いいね数</Form.Label>
            <Form.Control
              disabled={videoType === "normal"}
              name="videoLikeCount"
              type="number"
              placeholder="10000"
            />
          </Form.Group>
          <Form.Text muted>
            削除動画を選択する場合、できれば各種削除時点の値を記載してください。不明な場合は空白にしてください。
          </Form.Text>
        </Row>
        <Row className="mb-3">
          <Form.Group className="mb-3">
            <Form.Check
              required
              type="checkbox"
              label={
                <span>
                  <span
                    className={Styled.kiyakuSpan}
                    onClick={() => setKiyakuModalShow(true)}
                  >
                    利用規約
                  </span>
                  に同意する
                </span>
              }
            />
            <KiyakuModal
              show={kiyakuModalShow}
              onHide={() => setKiyakuModalShow(false)}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            送信
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default AddPage;
