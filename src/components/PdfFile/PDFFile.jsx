import React from "react";
import { Page, Text, Image, Document, StyleSheet,PDFViewer, View } from "@react-pdf/renderer";
import Logo from "../../img/logo.jpg";
import {Font} from '@react-pdf/renderer';
import MyCustomFont from '../../fonts/calibri.ttf';
import MyCustomFontBold from '../../fonts/calibriBold.ttf'

Font.register({
  family: 'Calibri',
  src: MyCustomFont
})
Font.register({
  family: 'CalibriBold',
  src: MyCustomFontBold
})

const styles = StyleSheet.create({
  body: {
    fontFamily: 'Calibri'
  },
  page: {
    backgroundColor: "white",
    color: "black",
    paddingTop: 18,
    paddingLeft: 30,
    paddingBottom: 20,
    paddingRight: 16,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header :{
    fontFamily: "Calibri",
    fontSize: 18,
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically
    justifyContent: 'flex-start', // Distribute space between items
  },
  headetText :{
    fontFamily: "CalibriBold",
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,

  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  logoImage: {
    width: 130,
    marginRight: 50
  }
});

const PDFFile = () => {

  const pageColors = ['#f6d186', '#f67280', '#c06c84'];

  const pages = [
    {text: 'Компания Lextan', image: Logo },
  ]

  return (
    //закоментировать вьювер когда макет готов будет
     <PDFViewer style={styles.viewer}>

    <Document>
      {/*render a single page*/}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logoImage} src={Logo} />
          <Text style={styles.headetText}>Коммерческое предложение.</Text>
        </View>
        <View style={styles.header}>
          <Image style={styles.logoImage} src={Logo} />
          <Text style={styles.headetText}>Коммерческое предложение.</Text>
        </View>
        <View style={styles.header}>
          <Image style={styles.logoImage} src={Logo} />
          <Text style={styles.headetText}>Коммерческое предложение.</Text>
        </View>
        <View style={styles.header}>
          <Image style={styles.logoImage} src={Logo} />
          <Text style={styles.headetText}>Коммерческое предложение.</Text>
        </View>
        <View style={styles.header}>
          <Image style={styles.logoImage} src={Logo} />
          <Text style={styles.headetText}>Коммерческое предложение.</Text>
        </View>
        <View style={styles.header}>
          <Image style={styles.logoImage} src={Logo} />
          <Text style={styles.headetText}>Коммерческое предложение.</Text>
        </View>
        <View style={styles.header}>
          <Image style={styles.logoImage} src={Logo} />
          <Text style={styles.headetText}>Коммерческое предложение.</Text>
        </View>
        <View style={styles.header}>
          <Image style={styles.logoImage} src={Logo} />
          <Text style={styles.headetText}>Коммерческое предложение.</Text>
        </View>
        <View style={styles.header}>
          <Image style={styles.logoImage} src={Logo} />
          <Text style={styles.headetText}>Коммерческое предложение.</Text>
        </View>
        <View style={styles.header}>
          <Image style={styles.logoImage} src={Logo} />
          <Text style={styles.headetText}>Коммерческое предложение.</Text>
        </View>
        <View style={styles.header}>
          <Image style={styles.logoImage} src={Logo} />
          <Text style={styles.headetText}>Коммерческое предложение.</Text>
        </View>
        <View style={styles.header}>
          <Image style={styles.logoImage} src={Logo} />
          <Text style={styles.headetText}>Коммерческое предложение.</Text>
        </View>
        <View style={styles.header}>
          <Image style={styles.logoImage} src={Logo} />
          <Text style={styles.headetText}>Коммерческое предложение.</Text>
        </View>
        <View style={styles.header}>
          <Image style={styles.logoImage} src={Logo} />
          <Text style={styles.headetText}>Коммерческое предложение.</Text>
        </View>
        <View style={styles.header}>
          <Image style={styles.logoImage} src={Logo} />
          <Text style={styles.headetText}>Коммерческое предложение.</Text>
        </View>
        <View style={styles.header}>
          <Image style={styles.logoImage} src={Logo} />
          <Text style={styles.headetText}>Коммерческое предложение.</Text>
        </View>
      </Page>
    </Document>
  </PDFViewer>
  );
};

export default PDFFile;