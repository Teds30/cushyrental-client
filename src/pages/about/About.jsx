import React from 'react'

import styles from './About.module.css'
import { Link } from 'react-router-dom'

import brandLogo from '../../assets/cr_light.svg'
import blurLogo from '../../assets/cr_filled_blur.svg'
import blurLogo2 from '../../assets/cr_filled_blur2.svg'

import ela from '../../assets/team/ela.png'
import teddy from '../../assets/team/teddy.png'
import jie from '../../assets/team/jie.png'
import john from '../../assets/team/john.png'

import ph from '../../assets/icon/philippines_flag.png'

import { BsChevronDoubleDown } from 'react-icons/bs'
import { TbArrowNarrowRight } from 'react-icons/tb'

const About = () => {
    return (
        <main className={styles['container']}>
            <div className={styles['header']}>
                <div className={styles['brand']}>
                    <div className={styles['brand-img']}>
                        <img src={brandLogo} alt="" />
                    </div>
                    <p className={styles['title']}>Cushy Rental</p>
                </div>
                <ul className={styles['nav-container']}>
                    <li>Home</li>
                    <li>Home</li>
                    <li>Home</li>
                </ul>
                <div className={styles['cta']}>
                    <Link className={styles['primary-btn']}>Board Now</Link>
                </div>
            </div>
            <section className={styles['intro']}>
                <div className={styles['blur-img']}>
                    <img src={blurLogo} alt="" />
                </div>
                <h1>Experience cozy lodging </h1>
                <p className={styles['support']}>
                    Discover and inquire units around Legazpi City
                </p>
                <div class={styles['mouseindicator']}>
                    <div class={styles['outer']}>
                        <div class={styles['inner']}></div>
                    </div>
                    <BsChevronDoubleDown
                        style={{ fill: 'rgba(0, 0, 0, 0.87)' }}
                    />
                </div>
            </section>
            <section className={styles['misvis_container']}>
                <span
                    className={styles['wave']}
                    style={{ marginBottom: '-6px' }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1440"
                        height="256"
                        viewBox="0 0 1440 256"
                        fill="none"
                    >
                        <path
                            d="M0 0L60 16C120 32 240 64 360 96C480 128 600 160 720 149.3C840 139 960 85 1080 85.3C1200 85 1320 139 1380 165.3L1440 192V256H1380C1320 256 1200 256 1080 256C960 256 840 256 720 256C600 256 480 256 360 256C240 256 120 256 60 256H0V0Z"
                            fill="#1D6156"
                        />
                    </svg>
                </span>

                <div className={styles['misvis']}>
                    <div className={styles['brand_blur']}>
                        <img src={blurLogo2} alt="" />
                    </div>
                    <div>
                        <h2
                            className={styles['gradient']}
                            npm
                            r
                            style={{ marginBottom: '32px' }}
                        >
                            Our Mission
                        </h2>
                        <p>
                            Cushy Rental is committed to revolutionizing the
                            traditional way of seeking boarding houses for
                            students and relying on the word of mouth of
                            landlords. We aim to provide a user-friendly and
                            comprehensive platform that simplifies the rental
                            process, fosters trust between students and
                            landlords, and creates a safe and secure community
                            for all.
                        </p>
                    </div>

                    <div>
                        <h2
                            className={styles['gradient']}
                            style={{ marginBottom: '32px' }}
                        >
                            Our Vision
                        </h2>
                        <p>
                            To be the go-to-online platform for students to find
                            and rent the perfect boarding house, promote, and
                            advertise landlords’ units, and foster a community
                            of trust, transparency, and accessibility.
                        </p>
                    </div>
                </div>

                <span className={styles['wave']}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1920"
                        height="411"
                        viewBox="0 0 1920 411"
                        fill="none"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0 102.64L80 153.96C160 205.28 320 307.92 480 359.24C640 410.56 800 410.56 960 376.346C1120 342.133 1280 273.706 1440 273.706C1600 273.706 1760 342.133 1840 376.346L1920 410.56V0H1840C1760 0 1600 0 1440 0C1280 0 1120 0 960 0C800 0 640 0 480 0C320 0 160 0 80 0H0V102.64Z"
                            fill="#1D6156"
                        />
                    </svg>
                </span>
            </section>
            <section className={styles['mtt']}>
                <h1>Meet the Team</h1>
                <p className={styles['support']}>
                    Locates innovative solution aligning to your needs
                </p>

                <div className={styles['team']}>
                    <div className={styles['member']}>
                        <div className={styles['member-img']}>
                            <div className={styles['blob']}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="215"
                                    height="206"
                                    viewBox="0 0 215 206"
                                    fill="none"
                                >
                                    <path
                                        d="M155.566 16.482C168.589 30.7372 172.053 55.7918 181.474 76.0946C191.033 96.3975 206.412 112.093 212.369 131.244C218.188 150.538 214.332 163.042 201.032 176.578C173.386 204.712 130.889 191.142 111.908 201.941C92.9279 212.885 97.1845 197.766 79.8666 201.941C62.4101 206.261 48.0562 192.705 37.9425 176.578C27.6903 160.307 36.8342 187.688 30.3226 169.977C23.9496 152.266 11.6192 140.027 5.24624 123.9C-1.12677 107.917 -1.81948 87.902 3.8608 68.7511C9.54109 49.4562 21.3173 30.8812 37.9425 18.9299C54.4292 6.83456 75.9035 1.36287 97.9319 0.210931C119.822 -0.941004 142.543 2.3708 155.566 16.482Z"
                                        fill="#03B077"
                                    />
                                </svg>
                            </div>
                            <img src={ela} alt="" />
                        </div>
                        <h3>ELA MAE</h3>
                        <p>Project Manager</p>
                    </div>
                    <div className={styles['member']}>
                        <div className={styles['member-img']}>
                            <div className={styles['blob']}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="215"
                                    height="219"
                                    viewBox="0 0 215 219"
                                    fill="none"
                                >
                                    <path
                                        d="M170.103 35.1739C186.974 47.0884 209.955 46.1811 213.009 68.45C216.209 90.8607 214.318 111.569 206.755 129.441C199.192 147.313 186.102 162.348 170.103 178.234C154.249 194.262 135.487 211.141 112.652 216.815C89.6716 222.488 62.4734 216.956 43.5655 202.063C24.5122 187.028 13.6038 162.632 6.91336 137.952C0.0774344 113.271 -2.39514 88.4494 5.02256 66.7479C12.4403 45.1882 29.8937 26.8908 50.1106 16.111C70.4729 5.18933 93.5986 1.78517 118.179 0.083091C142.614 -1.61899 153.231 23.2593 170.103 35.1739Z"
                                        fill="#03B077"
                                    />
                                </svg>
                            </div>
                            <img src={teddy} alt="" />
                        </div>
                        <h3>TEDDY MARC</h3>
                        <p>Lead Developer</p>
                    </div>
                    <div className={styles['member']}>
                        <div className={styles['member-img']}>
                            <div className={styles['blob']}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="215"
                                    height="188"
                                    viewBox="0 0 215 188"
                                    fill="none"
                                >
                                    <path
                                        d="M137.537 24.0161C160.253 32.0642 183.175 30.8093 196.941 41.6412C210.904 52.5706 215.83 75.889 214.39 95.9399C212.87 116.196 205.043 133.335 199.895 152.043C194.689 170.6 184.808 170.006 174.1 179.738C163.472 189.265 143.135 188.46 125.969 186.085C108.94 183.657 89.3822 182.088 74.0835 175.507C58.5877 168.828 56.2344 177.793 38.8476 162.974C21.4021 148.004 1.89932 127.743 0.241074 107.504C-1.61428 87.1686 14.4336 67.007 28.8459 45.915C43.2582 24.8231 56.1731 2.74716 74.0835 0.48213C91.8556 -1.72912 114.623 15.8706 137.537 24.0161Z"
                                        fill="#03B077"
                                    />
                                </svg>
                            </div>
                            <img src={jie} alt="" />
                        </div>
                        <h3>JOHN ARJIE</h3>
                        <p>Developer</p>
                    </div>
                    <div className={styles['member']}>
                        <div className={styles['member-img']}>
                            <div className={styles['blob']}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="209"
                                    height="206"
                                    viewBox="0 0 209 206"
                                    fill="none"
                                >
                                    <path
                                        d="M167.143 184.149C185.665 171.521 198.517 155.629 202.864 139.454C207.022 123.278 202.864 106.961 204.754 87.2382C206.455 67.5156 214.204 44.5294 203.242 32.0431C192.091 19.6987 162.418 17.8541 134.446 11.8948C106.473 5.93539 80.3911 -4.13876 62.058 1.8206C43.7249 7.77998 33.3298 29.7729 23.6907 47.0834C14.0516 64.5359 4.97955 77.306 1.57752 91.0693C-1.8245 104.833 0.63252 119.589 5.54656 135.765C10.4606 151.94 18.2097 169.534 34.2748 183.014C50.3399 196.493 74.9101 205.858 99.2913 206C123.861 206 148.432 196.635 167.143 184.149Z"
                                        fill="#03B077"
                                    />
                                </svg>
                            </div>
                            <img src={john} alt="" />
                        </div>
                        <h3>JOHN</h3>
                        <p>Project Manager</p>
                    </div>
                </div>
            </section>

            <section className={styles['community']}>
                <div className={styles['community-title']}>
                    <h2>Community</h2>
                    <p className={styles['support']}>Join the numbers</p>
                </div>
                <div className={styles['metrics']}>
                    <div className={styles['metric']}>
                        <h1>50</h1>
                        <h3>Units Listed</h3>
                    </div>
                    <div className={styles['metric']}>
                        <h1>20</h1>
                        <h3>Landlords Registered</h3>
                    </div>
                    <div className={styles['metric']}>
                        <h1>51</h1>
                        <h3>Tenants Registered</h3>
                    </div>
                </div>
            </section>

            <section className={styles['features-container']}>
                <div>
                    <h2>Why not look for an easier way?</h2>
                    <p className={styles['support']}>
                        We provide extensive features that enhance your search
                        method
                    </p>
                </div>

                <div className={styles['features']}>
                    <div className={styles['feature']}>
                        <div className={styles['feature-img']}>
                            <img src="" alt="" />
                        </div>
                        <p className="title">
                            Integrated Google Map for Unit Searching
                        </p>
                    </div>
                    <div className={styles['feature']}>
                        <div className={styles['feature-img']}>
                            <img src="" alt="" />
                        </div>
                        <p className="title">Cost Comparison Tool</p>
                    </div>
                    <div className={styles['feature']}>
                        <div className={styles['feature-img']}>
                            <img src="" alt="" />
                        </div>
                        <p className="title">Unit Comparison Tooll</p>
                    </div>
                    <div className={styles['feature']}>
                        <div className={styles['feature-img']}>
                            <img src="" alt="" />
                        </div>
                        <p className="title">Chat System</p>
                    </div>
                    <div className={styles['feature']}>
                        <div className={styles['feature-img']}>
                            <img src="" alt="" />
                        </div>
                        <p className="title">Save Favorite</p>
                    </div>
                    <div className={styles['feature']}>
                        <div className={styles['feature-img']}>
                            <img src="" alt="" />
                        </div>
                        <p className="title">Advertise Unit</p>
                    </div>
                </div>

                <h3>You can conveniently access records</h3>
                <div className={styles['features']}>
                    <div className={styles['feature']}>
                        <div className={styles['feature-img']}>
                            <img src="" alt="" />
                        </div>
                        <p className="title">Interactive Calendar</p>
                    </div>
                    <div className={styles['feature']}>
                        <div className={styles['feature-img']}>
                            <img src="" alt="" />
                        </div>
                        <p className="title">SMS Payment Reminder</p>
                    </div>
                    <div className={styles['feature']}>
                        <div className={styles['feature-img']}>
                            <img src="" alt="" />
                        </div>
                        <p className="title">Real-time Notification</p>
                    </div>
                </div>
            </section>

            <section className={styles['discover']}>
                <h2>Discover boarding house with us!</h2>
                <div className={styles['actions']}>
                    <div
                        className={`${styles['discover-btn']} ${styles['btn-primary']}`}
                    >
                        Browse Units
                        <span>
                            <TbArrowNarrowRight
                                style={{ width: 'inherit', height: 'inherit' }}
                            />
                        </span>
                    </div>
                    <div
                        className={`${styles['discover-btn']} ${styles['btn-outlined']}`}
                    >
                        Advertise Your Unit
                        <span>
                            <TbArrowNarrowRight
                                style={{ width: 'inherit', height: 'inherit' }}
                            />
                        </span>
                    </div>
                </div>
            </section>
            <section className={styles['contact-container']}>
                <div className={styles['contact-title']}>
                    <h2>Contact</h2>
                    <div className={styles['contact-shape']}></div>
                </div>
                <div className={styles['contact']}>
                    <div className={styles['contact-item']}>
                        <p className="title">Email Address</p>
                        <p>cushyrental@gmail.com</p>
                    </div>
                    <div className={styles['contact-item']}>
                        <p className="title">Phone Number</p>
                        <div className={styles['phone-num']}>
                            <span>
                                <img src={ph} alt="" />
                            </span>
                            <p>+63915-733-1288</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default About