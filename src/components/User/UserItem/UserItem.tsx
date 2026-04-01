import { useState } from "react";
import { User } from "../../../types/User";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./UserItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faTrash, faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import Button from "../../../components/UI/Button/Button";
import Modal from "../../../components/UI/Modal/Modal";

type Props = {
  user: User;
  onDelete: (id: number) => void;
  bookmarks: number[];
  onToggleBookmark: (id: number) => void;
  isAuthenticated: boolean;
};

function UserItem({ user, onDelete, bookmarks, onToggleBookmark, isAuthenticated }: Props) {

  const [showConfirm, setShowConfirm] = useState(false);
  const isBookmarked = bookmarks.includes(user.id);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="user-item">
        <div className="user-item__row flex-between">
            <div className="user-item__name">
                {user.lastName} - {user.firstName}
            </div>

            <div className="user-item__actions">
                <Link 
                    to={`/users/${user.id}/detail`} 
                    className="user-item__icon-button"
                    title="View user detail">
                    <FontAwesomeIcon icon={faEye} />
                </Link>
                <Link 
                    to={`/users/${user.id}/edit`} 
                    className="user-item__icon-button"
                    title="Edit user">
                    <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
                <button className="user-item__icon-button" type="button" onClick={() => setShowConfirm(true)} title="Delete user" aria-label="Delete user">
                    <FontAwesomeIcon icon={faTrash} />
                </button>
                <button
                    className="user-item__icon-button" 
                    onClick={() => {
                        if (!isAuthenticated) {
                          setShowLoginModal(true); 
                          return;
                        }
                        onToggleBookmark(user.id); 
                      }}
                      title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                    >
                    <FontAwesomeIcon icon={isBookmarked ? solidStar : regularStar} />
                </button>
            </div>
        </div>
        <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
            <p className="modal__text">
                Are you sure you want to delete <br />
                <strong>
                {user.firstName} {user.lastName}
                </strong>
                ?
            </p>

            <div className="modal__actions">
                <Button 
                    variant="secondary"
                    onClick={() => setShowConfirm(false)}
                >
                    Cancel
                </Button>

                <Button
                    variant="danger"
                    onClick={() => {
                        onDelete(user.id);
                        setShowConfirm(false);
                    }}
                >
                    Delete
                </Button>
            </div>
        </Modal>
        <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
            <p className="modal__text">
                Please log in to use bookmarks
            </p>

            <div className="modal__actions">
                <Button 
                    variant="secondary"
                    onClick={() => setShowLoginModal(false)}
                >
                    Cancel
                </Button>

                <Button 
                    variant="primary"
                    onClick={() => navigate("/login")}
                >
                    Login
                </Button>
            </div>
        </Modal>
    </div>
    );
}

export default UserItem;