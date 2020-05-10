import { StyleSheet } from 'aphrodite';

export const popupStyles = StyleSheet.create({
    tabs: {
        alignItems: 'stretch',
        display: 'flex',
        fontSize: 15,
        justifyContent: 'space-between',
        paddingTop: 15,
    },
    tabsNav: {
        alignItems: 'stretch',
        flex: 1,
        display: 'flex',
        listStyle: 'none',
        marginBottom: 0,
        paddingLeft: 0,
    },
    tabItem: {
        alignItems: 'stretch',
        color: '#5c7c83',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        textTransform: 'uppercase',
        marginLeft: 10,
        ':hover': {
            borderBottom: '1px solid #171123',
            color: '#4b1d3f',
        },
    },
    activeTabItem: {
        borderBottom: '1px solid #171123',
    }
});

export const productInfoStyles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        display: 'flex',
        fontSize: 14,
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 15,
        border: '1px solid #171123',
        borderRadius: 8,
        backgroundColor: '#f0d3f7'
    },
    image: {
        border: '1px solid #171123',
        borderRadius: 8,
    }
});