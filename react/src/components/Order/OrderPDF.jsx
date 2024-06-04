import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import logo from './logo.svg';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 20
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    text: {
        fontSize: 10
    },
    logo: {
        width: 100,
        marginBottom: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    headerRight: {
        textAlign: 'right'
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24
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
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20
    },
    signatureSection: {
        marginTop: 15
    },
    footer: {
        textAlign: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 30
    }
});

const products = [
    { name: 'Bijoux Bordeaux', quantity: 2, priceHT: 50, totalHT: 100 },
    { name: 'Montre Paris', quantity: 1, priceHT: 80, totalHT: 80 }
];

const renderProductsTable = () => (
    <View>
        <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.tableHeader]}>Nom du produit</Text>
            <Text style={[styles.tableCell, styles.tableHeader, styles.tableCellCenter]}>Quantité</Text>
            <Text style={[styles.tableCell, styles.tableHeader, styles.tableCellCenter]}>Prix HT</Text>
            <Text style={[styles.tableCell, styles.tableHeader, styles.tableCellCenter]}>Total HT</Text>
        </View>
        {products.map((product, index) => (
            <View style={styles.tableRow} key={index}>
                <Text style={styles.tableCell}>{product.name}</Text>
                <Text style={[styles.tableCell, styles.tableCellCenter]}>{product.quantity}</Text>
                <Text style={[styles.tableCell, styles.tableCellCenter]}>{product.priceHT} €</Text>
                <Text style={[styles.tableCell, styles.tableCellCenter]}>{product.totalHT} €</Text>
            </View>
        ))}
    </View>
);

const getTotal = (key) => products.reduce((acc, curr) => acc + curr[key], 0);

export default function OrderPDF() {
    const currentDate = new Date().toLocaleDateString('fr-FR');

    return (
        <PDFViewer>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Image src={logo} style={styles.logo} />
                        <View>
                            <Text style={styles.title}>Devis</Text>
                            <Text style={styles.text}>Numéro de devis : DEV001</Text>
                            <Text style={styles.text}>Date de création : {currentDate}</Text>
                            <Text style={styles.text}>Date limite de validité : 01/01/2025</Text>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text>Mme Sylvie Vartan</Text>
                        <Text>Avenue des fleurs</Text>
                        <Text>75000 PARIS</Text>
                    </View>
                    <View style={styles.section}>
                        <Text>FIDELI</Text>
                        <Text>9 impasse des bvd</Text>
                        <Text>75000 PARIS</Text>
                        <Text>email@email.com</Text>
                        <Text>Téléphone : 06 01 72 30 60</Text>
                    </View>
                    <Text style={styles.title}>Bijoux Bordeaux</Text>
                    {renderProductsTable()}
                    <View style={styles.totalSection}>
                        <Text style={styles.text}>Total HT : {getTotal('totalHT')} €</Text>
                        <Text style={styles.text}>Montant TVA : {getTotal('totalHT') * 0.2} €</Text>
                        <Text style={styles.text}>Total TTC : {getTotal('totalHT') * 1.2} €</Text>
                    </View>
                    <View style={styles.signatureSection}>
                        <Text style={styles.text}>Date et signature du client précédée de la mention 'Bon pour accord'</Text>
                    </View>
                    <View style={styles.footer}>
                        <Text>Hiboo CMS - Maxime LE GENTIL</Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
}
