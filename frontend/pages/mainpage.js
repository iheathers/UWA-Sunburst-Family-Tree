import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/mainpage.module.css';

function mainpage() {
    return (
        <div className={styles.singleline}>
            <div className={styles.title}>
                <h1>Your Family Tree</h1>
            </div>
            <div className={styles.buttons}>
                <button>Export</button>
                <button>Log out</button>
            </div>

        </div>
    )
}

export default mainpage