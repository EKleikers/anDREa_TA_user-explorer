import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../../../types/User";
import "./UserForm.css";
import Button from "../../../components/UI/Button/Button";

type Props = {
  onSave?: (user: User) => void;
  isCreate?: boolean;
  users?: User[];
};

function UserForm({ onSave, isCreate = false, users = [] }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<User | null>(null);

  // form validation
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });

 // validation rules
 const errors = {
    firstName: !formData?.firstName ? "Required field" : "",
    lastName: !formData?.lastName ? "Required field" : "",
    email: !formData?.email
      ? "Required field"
      : !formData.email.includes("@")
      ? "Invalid email"
      : "",
  };

  // find existing user
  const existingUser = users.find(u => u.id === Number(id));

  useEffect(() => {
    if (isCreate) {
      // empty user
      setFormData({
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        age: 0,
        gender: "",
        image: "",
        address: {
          address: "",
          city: "",
          state: "",
          postalCode: "",
        },
      });
    } else if (existingUser) {
      // uit state (voor nieuwe users!)
      setFormData(existingUser);
    } else {
      // fallback API
      fetch(`https://dummyjson.com/users/${id}`)
        .then(res => res.json())
        .then(data => setFormData(data));
    }
  }, [id, isCreate, existingUser]);

  // change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;

    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const field = name.split(".")[1];

      setFormData({
        ...formData,
        address: {
          ...(formData.address || {}),
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: name === "age" ? Number(value) : value,
      });
    }
  };

  // save handler
  const handleSave = async () => { 
    if (!formData) return;

    let success = false;

    if (isCreate) {
      const newUser: User = {
        ...formData,
        id: Date.now(),
        address: formData.address || {
          address: "",
          city: "",
          state: "",
          postalCode: "",
        },
      };

      success = (await onSave?.(newUser)) ?? false; 
    } else {
      success = (await onSave?.(formData)) ?? false; 
    }

      if (success) {
        navigate("/");
      }
  };

  if (!formData) return <p>Loading...</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 🔥 voorkomt reload
  
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
    });
  
    if (errors.firstName || errors.lastName || errors.email) {
      return;
    }
  
    await handleSave();
  };

  return (
    <div className="user-form__container">
        <h2 className= "user-form__title">{isCreate 
            ? "Create New User" 
            : formData
                ? `Edit User: ${formData.firstName} ${formData.lastName}`
                : "Edit User"}
        </h2>
        <hr className="hr"/>
        <form className="user-form card" onSubmit={handleSubmit}>
            <div className="user-form__group">
                <label className="user-form__label">First Name <span className="required">*</span></label>
                <div className="user-form__input-wrapper">
                  <input
                    className="input"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={() => setTouched(prev => ({ ...prev, firstName: true }))}
                  />
                  {touched.firstName && errors.firstName && (
                    <span className="error">{errors.firstName}</span>
                  )}
                </div>
            </div>

            <div className="user-form__group">
                <label className="user-form__label">Last Name<span className="required">*</span></label>
                <div className="user-form__input-wrapper">
                  <input
                    className="input"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={() => setTouched(prev => ({ ...prev, lastName: true }))}
                    />
                    {touched.lastName && errors.lastName && (
                      <span className="error">{errors.lastName}</span>
                    )}
                  </div>
            </div>

            <div className="user-form__group">
                <label className="user-form__label">Email<span className="required">*</span></label>
                <div className="user-form__input-wrapper">
                  <input
                    className="input"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                    />
                    {touched.email && errors.email && (
                      <span className="error">{errors.email}</span>
                    )}
                </div>
            </div>

            <div className="user-form__group">
                <label className="user-form__label">Phone</label>
                <input
                  className="input"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
            </div>

            <div className="user-form__group">
                <label className="user-form__label">Age</label>
                <input
                  className="input"
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
            </div>

            <strong className="user-form__address-label">Address</strong>

            <div className="user-form__address">
                <div className="user-form__group">
                <label>Street</label>
                <input
                    className="input"
                    name="address.address"
                    value={formData.address?.address || ""}
                    onChange={handleChange}
                />
                </div>

                <div className="user-form__group">
                <label>Postal Code</label>
                <input
                    className="input"
                    name="address.postalCode"
                    value={formData.address?.postalCode || ""}
                    onChange={handleChange}
                />
                </div>

                <div className="user-form__group">
                <label>City</label>
                <input
                    className="input"
                    name="address.city"
                    value={formData.address?.city || ""}
                    onChange={handleChange}
                />
                </div>

                <div className="user-form__group">
                <label>State</label>
                <input
                    className="input"
                    name="address.state"
                    value={formData.address?.state || ""}
                    onChange={handleChange}
                />
                </div>
            </div>

            <div className="user-form__actions">
              <Button 
                variant="success"
                type="submit"
              >
                Save
              </Button>
              <Button
                variant="secondary"
                type="button" 
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
            </div>
        </form>
    </div>
  );
}

export default UserForm;