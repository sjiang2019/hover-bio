import { StyleSheet } from "aphrodite";

export const hoverCardStyle = StyleSheet.create({
  popover: {
    alignItems: "stretch",
    display: "flex",
    fontSize: 14,
    justifyContent: "space-between",
    width: "500px",
    height: "240px",
    fontFamily: "sans-serif",
    backgroundColor: "white",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
  },
  image: {
    display: "block",
    maxHeight: "240px",
    maxWidth: "260px",
    width: "auto",
    height: "auto",
  },
  bioCard: {
    paddingLeft: 12,
    paddingRight: 12,
    height: "240px",
    overflowY: "scroll",
    // boxShadow: "inset 0 -25px 50px -35px rgba(0, 0, 0, 1)"
    boxShadow: "inset 0 -35px 50px -50px rgba(0, 0, 0, 1)"
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
    paddingBottom: 12,
    paddingTop: 12,
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
    paddingBottom: 12
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
    paddingTop: 8,
    paddingBottom: 8,
  },
  newsSection: {
    paddingBottom: 12,
  },
  linkSection: {
    paddingBottom: 6,
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
    paddingBottom: 12,
    paddingTop: 12,
  },
  text: {
    color: "#293241",
    paddingBottom: 6,
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
