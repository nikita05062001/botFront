import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Calibri",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headetText: {
    fontFamily: "CalibriBold",
    fontSize: 20,
    textTransform: "uppercase",
  },
  logoImage: {
    width: 120,
    marginRight: 40,
  },
  headerTitle: {
    borderBottom: "2px solid #000",
    paddingBottom: 5,
    marginBottom: 10,
  },
  headerContent: {
    fontSize: 11,
    marginTop: 10,
    lineHeight: 1.4,
  },
  table: {
    display: "table",
    width: "100%",
    marginTop: 10,
  },
  headerTableRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    minHeight: 25,
  },
  bodyTableRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    minHeight: 40,
    paddingVertical: 4,
  },
  TableRowColorGrey: {
    backgroundColor: "#f9f9f9",
  },
  TableColTitle: {
    width: "100%",
    textAlign: "center",
    fontFamily: "CalibriBold",
  },
  BoldText: {
    fontFamily: "CalibriBold",
  },
  FinishBlock: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  SignImage: {
    width: 60,
    height: "auto",
  },
  ShtampImage: {
    width: 100,
    height: "auto",
  },
});

export default styles;
