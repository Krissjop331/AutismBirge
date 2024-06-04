import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { deleteAllForums, deleteForum } from "../../../store/forumReducer";
import { useDispatch } from "react-redux";
import { addTopicApi, deleteForumApi } from "../../../http/forumAPI";

function TextComponent({ text, maxLength }) {
  if (text.length > maxLength) {
    return <div>{text.slice(0, maxLength)}...</div>;
  }
  return <div>{text}</div>;
}

function DeleteModal({ isOpen, onClose, onDelete, text }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <p>{text}</p>
        <div className="modalBtnGroups">
          <button onClick={onDelete} className="yesBtnModal">
            Да
          </button>
          <button onClick={onClose} className="cancelBtnModal">
            Отмена
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
}

function AddTopicModal({ onClose, id }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <p>Добавить тему</p>
        <p className="captionAdmin">Title *</p>
        <input
          className="adminInput"
          type="text"
          name="title"
          value={title}
          placeholder="Title of topic"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <p className="captionAdmin">Description *</p>
          <textarea
            className="adminInput"
            name="description"
            value={desc}
            rows={10}
            cols={150}
            placeholder="Text info"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <input
          className="adminButton createForumBtn"
          type="button"
          value="Create Topic"
          onClick={() => {
            addTopicApi(id, { title, description: desc }).then(() => onClose());
          }}
        />
        <input
          className="adminButton createForumBtn"
          type="button"
          value="Back"
          onClick={onClose}
          style={{ marginLeft: 20 }}
        />
      </div>
    </div>,
    document.body,
  );
}

export const AdminForumItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState("item");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const handleDelete = (id) => {
    dispatch(deleteForum(id));
    deleteForumApi(id);
    setIsModalOpen(false);
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllForums());
    setIsModalOpen(false);
  };

  return (
    <div className={`adminforumItem ${props.className}`}>
      <p className="forumId">{props.item.id}</p>
      <p className="forumTitle">{props.item.title}</p>
      <p className="forumDescription">
        <TextComponent text={props.item.description} maxLength={40} />
      </p>
      <p className="forumCreateDate">{props.item.addTopic}</p>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={() =>
          deleteMode === "item"
            ? handleDelete(props.item.id)
            : handleDeleteAll()
        }
        text={
          deleteMode === "item"
            ? "Вы уверены, что хотите удалить элемент?"
            : "Вы уверены, что хотите удалить все элементы?"
        }
      />
      {addModalOpen && (
        <AddTopicModal
          id={props.item.id}
          onClose={() => setAddModalOpen(false)}
        />
      )}

      {!props.className ? (
        <div className="adminButtonGroups">
          <input
            type="button"
            value="add"
            onClick={() => {
              setAddModalOpen(true);
            }}
          />
          <input
            type="button"
            value="Edit"
            onClick={() =>
              navigate("/admin/forum/edit", { state: { data: props.item } })
            }
          />
          <input
            type="button"
            value="Delete"
            onClick={() => {
              setIsModalOpen(true);
              setDeleteMode("item");
            }}
          />
        </div>
      ) : (
        <div className="adminButtonGroups">
          <input
            type="button"
            value="Create"
            onClick={() => navigate("/admin/forum/create")}
          />
          <input
            type="button"
            value="Delete All"
            onClick={() => {
              setIsModalOpen(true);
              setDeleteMode("all");
            }}
          />
        </div>
      )}
    </div>
  );
};