import { useParams, useNavigate } from "react-router-dom";
import { User } from "../../../types/User";
import "./UserCard.css";
import Button from "../../../components/UI/Button/Button";

type Props = {
  user: User;
};

function UserCard({ user }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="user-card card">
      <div className="user-card__header">
        <img src={user.image} alt={user.firstName} />

        <div className="user-card__header-info">
          <h3 className="user-card__title">
            {user.firstName} {user.lastName}
          </h3>
          <p className="user-card__email">{user.email}</p>
        </div>
      </div>
      <hr className="hr"  />
      <div className="user-card__info">
        <p className="user-card__label">Phone:</p>
        <p>{user.phone}</p>
        <p className="user-card__label">Age:</p>
        <p>{user.age}</p>
        <p className="user-card__label">Gender:</p>
        <p>{user.gender}</p>
      </div>
      
      <strong className="user-card__address-label">Address:</strong>
      <div className="user-card__address">
        <p>{user.address.address}</p>
        <p>{user.address.postalCode} {user.address.city}</p>
        <p>{user.address.state}</p>
      </div>

      

      <div className="user-card__actions">
        <Button 
          variant="primary"
          onClick={() => navigate(`/users/${id}/edit`)}
        >
          Edit
        </Button>
        <Button 
          variant="secondary"
          onClick={() => navigate("/")}
        >
          Back
        </Button>
      </div>
    </div>
  );
}

export default UserCard;