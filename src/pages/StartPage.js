import React from 'react';
import HeaderAuthenticated from '../components/HeaderAuthenticated';


const StartPage = () => {
    return (
    <div style={styles.container}>
        <div style={styles.headerWrapper}>
            <HeaderAuthenticated />
        </div>
    </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    headerWrapper: {
        width: '100%',
    },
    listContainer: {
        display: 'flex',
        alignItems: 'left', // Vänsterjustera listContainer
        justifyContent: 'center', // Centrera listContainer
        margin: '20px',
        width: '80%',
        maxWidth: '1200px',
    },
    list: {
        flex: 1,
        margin: '0 40px', // Minska avståndet mellan listorna till 20px
        minWidth: '300px',
        textAlign: 'center', // Centrera innehållet inom varje lista
    },
};

export default StartPage;
