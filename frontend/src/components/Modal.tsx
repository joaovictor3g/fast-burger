import React from 'react';
import Image, { ImageProps } from 'next/image';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ModalInfo from '@material-ui/core/Modal';
import styles from '../styles/components/Modal.module.scss';
import paoDeBrioche from '../assets/pao-brioche.svg';
interface ModalProps {
  title: string;
  description: string;
  img?: string;
  isOpen: boolean;
  handleClose():void;
} 

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      border: 0,
      // padding: theme.spacing(2, 4, 3),
      background: '#000',
    },
    title: {
      fontFamily: 'Montserrat, sans-serif',
      color: '#FFF',
      textAlign: 'center'
    },

    description: {
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '12px',
      lineHeight: '15px',
      textAlign: 'center',

      color: '#FFFFFF',
    },

    image: {
      width: '100%',
      objectFit: 'cover',
      height: 300,
    }
  }),
);

export function Modal({ description, img, title, isOpen=false, handleClose }: ModalProps) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div 
        style={{ 
          display:'flex', 
          height: '100%', 
          flex: 1,  
          position: 'relative', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >

      {/*disable-eslint-nextline*/}
      <img 
        className={classes.image} 
        src={img} 
        alt="ingrediente"
      />
      </div>
      <h2 className={classes.title}>{title}</h2>
      <p className={classes.description} id="simple-modal-description">
        {description}
      </p>
    </div>
  );

  return (
    <div className={styles.container}>
      <ModalInfo
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalInfo>
    </div>
  );
}