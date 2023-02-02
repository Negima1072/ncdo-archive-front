import ProgressList from "components/ProgressList";
import React from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Styled from "./MainPage.module.scss";

const MainPage = () => {
  return (
    <Container>
      <Card className={Styled.mainCard}>
        <Card.Header>
          <h4 className={Styled.cardTitle}>このサイトについて</h4>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            これはニコニコ動画のコメントを保存するために作成されたアプリケーションです。主に削除動画等のコメント情報をアーカイブすることを目的としています。
            なお、本サイトで閲覧できる情報は(株)ドワンゴおよびニコニコ動画の著作物が含まれていますが本サイトは直接的に一切の関係がなく、サイト全体がニコニコ動画の二次創作物です。
            <br />
            また、本サイトはウェブ魚拓と同一のポリシーで運営しています。
            <a
              href="https://megalodon.jp/pc/page/policy"
              target="_blank"
              rel="noreferrer"
            >
              参考
            </a>
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className={Styled.mainCard}>
        <Card.Header className={Styled.modHeader}>
          <h4 className={Styled.cardTitle}>現在処理中の動画</h4>
          <Link to="/stats">すべて見る</Link>
        </Card.Header>
        <Card.Body className={Styled.tableCard}>
          <ProgressList />
        </Card.Body>
      </Card>
      <Card className={Styled.mainCard}>
        <Card.Header className={Styled.modHeader}>
          <h4 className={Styled.cardTitle}>最近追加されたの動画</h4>
          <Link to="/list">すべて見る</Link>
        </Card.Header>
        <Card.Body className={Styled.tableCard}>
          <ProgressList />
        </Card.Body>
      </Card>
      <Card className={Styled.mainCard}>
        <Card.Header className={Styled.modHeader}>
          <h4 className={Styled.cardTitle}>予約中の動画</h4>
          <Link to="/reserve">すべて見る</Link>
        </Card.Header>
        <Card.Body className={Styled.tableCard}>
          <ProgressList />
        </Card.Body>
      </Card>
      <Card className={Styled.mainCard}>
        <Card.Header>
          <h4 className={Styled.cardTitle}>問い合わせ</h4>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            不具合報告や改善点等、問い合わせは製作者のTwitterもしくは、GithubのIssue・PRからお願いします。
            <br />
            Twitter:{" "}
            <a
              href="https://twitter.com/Negima1072"
              target="_blank"
              rel="noreferrer"
            >
              @Negima1072
            </a>
            <br />
            Github:{" "}
            <a
              href="https://github.com/Negima1072/ncdo-archive-front"
              target="_blank"
              rel="noreferrer"
            >
              Negima1072/ncdo-archive-front
            </a>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MainPage;
