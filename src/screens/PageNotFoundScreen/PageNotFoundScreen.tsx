import React from 'react'
import styles from './PageNotFoundScreen.module.css';
import { Link, useNavigate } from 'react-router-dom'
import PNF from '../../SVGS/page_not_found.svg'

const PageNotFoundScreen = () => {
  const navigate= useNavigate();

	const goBack = () => {
		navigate(-1);
	}

  return (
    <div className="d-flex justify-content-center align-items-center container">
			<div className="jumbotron d-flex justify-content-center align-items-center flex-column text-center">
				<img className={styles.homeIllustration} src={PNF} alt='time sync pnf svg' />
				<h1 className={styles.textContainer}>Page Not Found</h1>
				<p className={styles.lightPara}>It seems you are looking for a page that does not exists.</p>
				<hr className="mt-0 mb-4" style={{width:"100px"}}/>
				<p className={styles.lightPara}>If you find this behaviour unexpected then please inform us.</p>
				<p className="">
					<button className="btn btn-dark mx-2" onClick={goBack}>Back</button>
					<Link className="btn btn-light" to="/">Go home</Link>
				</p>
			</div>
		</div>
  )
};

export default PageNotFoundScreen;