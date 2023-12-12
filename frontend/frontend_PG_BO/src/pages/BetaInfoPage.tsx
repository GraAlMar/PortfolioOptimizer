import React, {useState} from "react";
import styles from "./FinIndInfoPage.module.css"
import {Typography, Link, Box} from "@mui/material";
import {headings1, images, text1} from "../data/BetaInfo.tsx";
import ArrowRightIcon from "@mui/icons-material/ArrowRight"


const BetaInfoPage: React.FC = () => {
    const [currentHeading, setCurrentHeading] = useState(null)

    const handleHeadingClick = (heading) => {
        setCurrentHeading(heading)
    }

    const headingStyles = {
        marginTop: "40px",
        marginBottom: "40px"

    }
    const linkStyles = {

        marginBottom: "20px",
        marginRight: "20px"
        //justifyContent: "left",
        //display: "grid"
    }
    const arrowStyles = {
        color: "#747779",
        marginLeft: "10px"
    }
    //const headings = ["Einleitung", "Hauptteil", "Schluss"];
    //const text = ["Das ist der Einleitungstext, bla bla bla bla blaablalbaldfabkdfadlffakdfa","Dies ist der Hauptteiltext, blaa sdlsdbkajalsdkasdjwel","Dies ist der Schlusstext, bla sdlasdjwoeiasdlskdjasldfjas"]
    return (
        <div className={styles.pageStyle}>
            <div className={styles.leftColumnStyle}>
                {headings1.map((heading, index) => (
                    <Typography variant="h6" style={linkStyles} key={index}>
                        <Link href={`#${heading}`} onClick={() => handleHeadingClick(heading)}>{heading}</Link>
                        {heading === currentHeading && <ArrowRightIcon style={arrowStyles}/>}
                    </Typography>
                ))}
            </div>
            <Box className={styles.middleColumnStyle}>
                {text1.map((paragraph, index) => (
                    <div key={index}>
                        <Typography variant="h4" style={headingStyles} id={headings1[index]}>
                            {headings1[index]}
                        </Typography>
                        <Typography variant="body1" className={styles.textStyle} key={index} id={headings1[index]}>{paragraph}</Typography>
                    </div>

                ))}
            </Box>
            <Box className={styles.rightColumnStyle}>

                {images.map((image, index) => (
                    <img src={image.src} alt={image.alt} key={index} style={{marginBottom: "20px"}}/>
                ))}
            </Box>

        </div>
    )
}
export default BetaInfoPage;