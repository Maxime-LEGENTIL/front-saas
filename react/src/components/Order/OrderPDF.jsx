import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 0
    },
    clientCompanyContainer: {
        marginTop: 0,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    titleCommand: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 15,
        textAlign: 'center',
        width: '100%'
    },
    detailText: {
        fontSize: 10,
        marginBottom: 5
    },
    logo: {
        width: 100,
        marginBottom: 10
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        width: '100%'
    },
    fullWidthContainer: {
        width: '100%'
    },
    tableHeader: {
        fontWeight: 'bold'
    },
    tableCell: {
        padding: 4,
        fontSize: 10
    },
    tableCellCenter: {
        textAlign: 'center'
    },
    totalSection: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: 20,
        alignSelf: 'flex-end', // Ensures the total section aligns to the right
        width: '100%' // Ensures the total section takes full width
    },
    signatureSection: {
        marginTop: 50
    },
    footer: {
        textAlign: 'center',
        position: 'absolute',
        bottom: 20,
        width: '100%'
    },
    totalSectionText: {
        marginTop: 20
    },
    companyInfo: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flexGrow: 1,
        alignItems: 'flex-start'
    },
    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24
    },
    totalSectionRight: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: 50,
        fontSize: 10
    },
    signatureSectionRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        marginTop: 15
    },
    text: {
        fontSize: 10,
        marginBottom: 5
    }
});

const renderProductsTable = (products) => (
    <View style={styles.fullWidthContainer}>
        <View style={styles.productRow}>
            <Text style={[styles.tableCell, styles.tableHeader]}>Nom du produit</Text>
            <Text style={[styles.tableCell, styles.tableCellCenter]}>Quantité</Text>
            <Text style={[styles.tableCell, styles.tableCellCenter]}>Prix HT</Text>
            <Text style={[styles.tableCell, styles.tableCellCenter]}>Total HT</Text>
        </View>
        {products.map((product, index) => (
            <View style={styles.productRow} key={index}>
                <Text style={styles.tableCell}>{product.name}</Text>
                <Text style={[styles.tableCell, styles.tableCellCenter]}>{product.quantity}</Text>
                <Text style={[styles.tableCell, styles.tableCellCenter]}>{product.price} €</Text>
                <Text style={[styles.tableCell, styles.tableCellCenter]}>{(product.quantity * product.price).toFixed(2)} €</Text>
            </View>
        ))}
    </View>
);

const getTotalHT = (products) => {
    return products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
};

export default function OrderPDF({ title, orderNumber, orderName, customerDetails, orderProducts }) {
    const currentDate = new Date().toLocaleDateString('fr-FR');
    
    // Ensure orderProducts is an array
    const products = Array.isArray(orderProducts) ? orderProducts : [];

    const totalHT = getTotalHT(products);
    const totalTVA = totalHT * 0.2;
    const totalTTC = totalHT + totalTVA;

    return (
        <PDFViewer width={'100%'} height={'500px'}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8_CNq9O-CdTFgDe8SMlsCxHHdFiJBxC5CCw&s" style={styles.logo} />
                        <View>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.detailText}>Numéro de {title} : {orderNumber}</Text>
                            <Text style={styles.detailText}>Date de création : {currentDate}</Text>
                            <Text style={styles.detailText}>Date limite de validité : 01/01/2025</Text>
                        </View>
                    </View>
                    
                    <View style={styles.clientCompanyContainer}>
                        <View style={styles.section}>
                            <View style={styles.companyInfo}>
                                <Text style={styles.title}>{`${customerDetails.firstname} ${customerDetails.lastname}`}</Text>
                                <Text style={styles.detailText}>Adresse : {customerDetails.address}</Text>
                                <Text style={styles.detailText}>Email: {customerDetails.email}</Text>
                                <Text style={styles.detailText}>Téléphone : {customerDetails.phone}</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.titleCommand}>{orderName}</Text>

                    {renderProductsTable(products)}
                    
                    <View style={styles.totalSectionRight}>
                        <Text style={styles.text}>Total HT : {totalHT.toFixed(2)} €</Text>
                        <Text style={styles.text}>Montant TVA : {totalTVA.toFixed(2)} €</Text>
                        <Text style={styles.text}>Total TTC : {totalTTC.toFixed(2)} €</Text>
                    </View>

                    <View style={styles.footer}>
                        <Text>Hiboo CMS - Maxime LE GENTIL</Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
}
