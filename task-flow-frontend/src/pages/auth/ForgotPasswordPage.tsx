import { ChangeEvent, FormEvent, useState } from "react";
import AuthPageContainer from "../../components/AuthPageContainer";
import classes from './ForgotPasswordPage.module.scss';
import BaseInput from "../../components/BaseInput";
import BaseButton from "../../components/BaseButton";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/slices/authSlice";

export default function ForgotPasswordPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);
    const [formData, setFormData] = useState({
        email: '',
    })

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
            await dispatch(forgotPassword(formData)).unwrap();
        } catch (err) {
            console.error("Forgot password failed:", err);
        }
    }
    return <AuthPageContainer>
        <div className={classes.welcomeText}>
            <h1>Forgot Passowrd</h1>
        </div>

        <form className={classes.form} onSubmit={handleSubmit}>
            <BaseInput
                value={formData.email}
                label="Email"
                placeholder="lorem@example.com"
                name="email"
                onChange={handleChange}
            />

            <p className={classes.error}>{error}</p>

            <BaseButton type="submit" loading={loading}>
                Submit
            </BaseButton>

            <BaseButton variant='outlined' to="/register"   >
                Back to Login
            </BaseButton>
        </form>

    </AuthPageContainer>
}