import classes from './LoginPage.module.scss';
import AuthPageContainer from '../../components/AuthPageContainer';

export default function LoginPage() {
    return (
        <AuthPageContainer>

            <div className={classes.welcomeText}>
                <p>Please enter your details</p>
                <h1>Welcome back</h1>
            </div>


        </AuthPageContainer>
    );
}