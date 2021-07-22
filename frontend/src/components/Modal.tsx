import React from 'react';
import Image from 'next/image';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ModalInfo from '@material-ui/core/Modal';
import styles from '../styles/components/Modal.module.scss';
import paoDeBrioche from '../assets/pao-brioche.svg';
interface ModalProps {
  title?: string;
  description?: string;
  img?: string;
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
      padding: theme.spacing(2, 4, 3),
      background: 'red',
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
      objectFit: 'fill'
    }
  }),
);

export function Modal({ description, img, title }: ModalProps) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      <Image className={classes.image} src={paoDeBrioche} alt="ingrediente"/>
      </div>
      <h2 className={classes.title}>Pão de brioche</h2>
      <p className={classes.description} id="simple-modal-description">
        Ele é doce e macio, levando manteiga, 
        leite, gemas e açúcar em sua receita.
      </p>
    </div>
  );

  return (
    <div className={styles.container}>
      <button onClick={handleOpen}>abrir</button>
      <ModalInfo
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalInfo>
    </div>
  );
}