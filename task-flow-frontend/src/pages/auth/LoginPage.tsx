import classes from './LoginPage.module.scss';
import AuthPageContainer from '../../components/AuthPageContainer';
import { BaseCard } from '../../components/BaseCard';

export default function LoginPage() {
    return (
        <AuthPageContainer>
            <div className={classes.container}>
                <BaseCard>
                    <div className={classes.welcomeText}>
                        <p>Please enter your details</p>
                        <h1>Welcome back</h1>
                    </div>

                </BaseCard>
            </div>

        </AuthPageContainer>
    );
}