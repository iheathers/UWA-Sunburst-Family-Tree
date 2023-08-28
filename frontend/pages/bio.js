import { useState } from 'react';
import Modal from './components/Modal';
import styles from '../styles/mainpage.module.css';

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={styles.singleline}>
                <div className={styles.title}>
                    <h1>Your Family Tree</h1>
                </div>
                <div className={styles.titlebuttons}>
                    <button className={styles.exportbutton}>Export</button>
                    <button className={styles.logoutbutton}>Log out</button>
                </div>

            </div>
            {/* family Tree */}
            
            <div>


                <button onClick={openModal}>Open Modal</button>

                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <div className={styles.modalcard}>
                        <div className={styles.upside}>
                            <div className={styles.content}>
                                <div className={styles.imagepart}>
                                    <img src="/images/testimg.jpg" alt="testimg" />
                                </div>
                                <div className={styles.textpart}>
                                    <h1>Emily Page</h1>
                                    <div className={styles.info}>
                                        <p className={styles.label}>Birth:</p>
                                        <p>10th September 1901</p>
                                        <p className={styles.label}>Death:</p>
                                        <p>4th April 1973</p>
                                        <p className={styles.label}>Location:</p>
                                        <p>Perth, Western Australia</p>
                                        <p className={styles.label}>Occupation:</p>
                                        <p>Artist</p>
                                    </div>
                                </div>
                                <div className={styles.buttons}>
                                    <button className={styles.editbutton}>Edit</button>
                                    <button className={styles.closeButton} onClick={closeModal}>
                                        <span className={styles.closeIcon}>&times;</span>
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className={styles.downside}>
                            <div className={styles.downsidecard}>
                                <h3>ABOUT EMILY</h3>
                                <p>Guided by her passion, Emily pursued formal training at the School of Fine Arts, where her talent flourished under the tutelage of revered mentors. Oil on canvas became her chosen medium, allowing her to conjure scenes that range from serene landscapes to the fiery depths of passion. Her work quickly garnered attention, adorning gallery walls and private collections alike.</p>
                                <p>Beyond the canvas, Emily's artful spirit is interwoven with her family life. Her children, a constant source of inspiration, have played muse to some of her most treasured pieces. Her art studio echoes with the laughter and boundless imagination of young minds, infusing her work with an extra layer of depth and meaning.</p>
                            </div>
                            <div className={styles.downsidecard}>
                                <h3 className={styles.comment_title}>COMMENTS</h3>
                                <p className={styles.name}>Michael Busch <span className={styles.date}>6 days ago</span></p>
                                <p>I still have her painting of us in my kitchen!</p>
                                <div className={styles.commentbox}>
                                    <textarea className={styles.commentinput} placeholder="Add a comment..." />
                                    <div>
                                        <button className={styles.commentbutton}>Post</button>
                                        <button className={styles.commentbutton}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.downsidecard}>
                                <h3>SUGGEST AND EDIT</h3>
                                <p className={styles.name}>Michael Busch <span className={styles.date}>6 days ago</span></p>
                                <p>I still have her painting of us in my kitchen!</p>
                                <div className={styles.commentbox}>
                                    <textarea className={styles.commentinput} type="text" placeholder="Add a comment..." />
                                    <div>
                                        <button className={styles.commentbutton}>Post</button>
                                        <button className={styles.commentbutton}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </Modal>
            </div>
        </>
    );
};

export default HomePage;

