import { useDispatch, useSelector } from "react-redux";
import AuthPageContainer from "../../components/AuthPageContainer";
import BaseButton from "../../components/BaseButton";
import BaseInput from "../../components/BaseInput";
import classes from "./Auth.module.scss";
import { AppDispatch, RootState } from "../../redux/store";
import { ChangeEvent, FormEvent, useState } from "react";
import { resetPassword } from "../../redux/slices/authSlice";

export default function ResetPasswordPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const [formData, setFormData] = useState({
        code: '',
        password: '',
        password_confirmation: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(resetPassword(formData)).unwrap();
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return <AuthPageContainer>
        <div className={classes.welcomeText}>
            <p>Check your email and enter the code below</p>
        </div>

        <form className={classes.form} onSubmit={handleSubmit}>
            <BaseInput
                value={formData.code}
                label="Code"
                placeholder="Enter the code you received"
                name="code"
                onChange={handleChange}
            />
            <BaseInput
                value={formData.password}
                label="Password"
                placeholder="Enter your password"
                name="password"
                type="password"
                onChange={handleChange}
            />

            <BaseInput
                value={formData.password_confirmation}
                label="Password Confirmation"
                placeholder="Enter your password again"
                name="password_confirmation"
                type="password"
                onChange={handleChange}
            />

            <p className={classes.error}>{error}</p>
            <BaseButton type="submit" loading={loading}>
                Update Password
            </BaseButton>

            <BaseButton variant='outlined' to="/login"   >
                Back to Login
            </BaseButton>

        </form>
    </AuthPageContainer>
}