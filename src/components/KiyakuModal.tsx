import React from "react";
import { Button, Modal } from "react-bootstrap";

interface KiyakuModalProps {
  show: boolean;
  onHide: () => void;
}

const KiyakuModal = (props: KiyakuModalProps) => {
  return (
    <Modal size="lg" centered show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>利用規約</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ニコ動コメントアーカイブス（以下本サイト）上でコメント情報を取得する利用者（以下利用者）は、
          本サイトの利用の際、当利用規約（以下本規約）に同意しているものとみなします。
          <br />
          また、本規約は利用者の許可を得ずに予告なく変更できるものとします。
        </p>
        <h4>禁止事項</h4>
        <ul>
          <li>本サイトのサーバーに過度な負荷をかける行為</li>
          <li>ニコニコ動画サーバーに過度な負荷をかける恐れのある行為</li>
          <li>その他不法行為</li>
        </ul>
        <h4>削除</h4>
        <p>以下の場合、本サイトサーバーに保存してある情報を削除します。</p>
        <ul>
          <li>正当な権利者による削除申し立て申請</li>
        </ul>
        <h4>免責事項</h4>
        <p>
          本サイトの利用によって利用者に発生した損害、及び利用できないことによって発生した損害に対して本サイトは一切の責任を負いません。
        </p>
        <p>初版: 2023/02/03</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={props.onHide}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default KiyakuModal;
