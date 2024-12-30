import classes from './LoginPage.module.scss';
import AuthPageContainer from '../../components/AuthPageContainer';
import BaseInput from '../../components/BaseInput';

export default function LoginPage() {
    return (
        <AuthPageContainer>

            <div className={classes.welcomeText}>
                <p>Please enter your details</p>
                <h1>Welcome back</h1>
            </div>

            <div className={classes.form} >
                fds
                <form action="">
                    <BaseInput />
                </form>
            </div>


        </AuthPageContainer>
    );
}