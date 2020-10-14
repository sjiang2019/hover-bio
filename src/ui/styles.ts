import { StyleSheet } from "aphrodite";

export const hoverCardStyle = StyleSheet.create({
  popover: {
    alignItems: "stretch",
    display: "flex",
    fontSize: 14,
    justifyContent: "space-between",
    width: "500px",
    height: "250px",
    fontFamily: "sans-serif",
    backgroundColor: "white",
    border: "1px solid #F5F5F5",
    boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.25)",
  },
  image: {
    display: "block",
    maxHeight: "250px",
    maxWidth: "250px",
    width: "auto",
    height: "auto",
  },
  bioCard: {
    marginLeft: 12,
    marginRight: 12,
    height: "250px",
    overflowY: "auto",
  },
  link: {
    color: "#3E505B",
    ":hover": {
      color: "#8AB4F7",
    },
    textDecoration: "none",
  },
});

export const summarySectionStyle = StyleSheet.create({
  header: {
    textTransform: "uppercase",
    fontSize: "x-large",
    fontWeight: "bold",
    color: "#3d5a80",
    marginBottom: 12,
    marginTop: 12,
  },
  headerLink: {
    color: "#3d5a80",
    ":hover": {
      color: "#98c1d9",
    },
    textDecoration: "none",
  },
  bioText: {
    fontStyle: "italic",
    color: "#293241",
    paddingBottom: 12,
  },
  link: {
    color: "#293241",
    ":hover": {
      color: "#98c1d9",
    },
    textDecoration: "none",
  },
});

export const socialSectionStyle = StyleSheet.create({
  socialSection: {
    marginBottom: 12
  },
  socialMedia: {
    color: "#3d5a80",
    paddingRight: 6,
    textDecoration: "none",
  },
});

export const newsSectionStyle = StyleSheet.create({
  newsHeader: {
    textTransform: "uppercase",
    fontSize: "large",
    fontWeight: "bold",
    color: "#3d5a80",
    marginTop: 8,
    marginBottom: 8,
  },
  newsSection: {
    marginBottom: 12,
  },
  linkSection: {
    marginBottom: 6,
  },
  link: {
    color: "#293241",
    ":hover": {
      color: "#98c1d9",
    },
    textDecoration: "none",
  },
});

export const metadataSectionStyle = StyleSheet.create({
  metadataSection: {
    marginBottom: 12,
    marginTop: 12,
  },
  text: {
    color: "#293241",
    marginBottom: 6,
  },
  boldText: {
    fontWeight: "bold",
  },
  link: {
    color: "#293241",
    ":hover": {
      color: "#98c1d9",
    },
    textDecoration: "none",
  },
});
