import { StyleSheet } from 'aphrodite';

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
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
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
    color: "#3E505B",
    marginBottom: 12,
    marginTop: 12,
  },
  bioText: {
    fontStyle: "italic",
    color: "#3E505B",
    paddingBottom: 12,
  },
  link: {
    color: "#3E505B",
    ":hover": {
      color: "#8AB4F7",
    },
    textDecoration: "none",
  },
})

export const socialSectionStyle = StyleSheet.create({
  socialMedia: {
    color: "#77A6B6",
    paddingRight: 6,
    textDecoration: "none",
  },
})

export const newsSectionStyle = StyleSheet.create({
  newsHeader: {
    textTransform: "uppercase",
    fontSize: "large",
    fontWeight: "bold",
    color: "#3E505B",
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
    color: "#3E505B",
    ":hover": {
      color: "#8AB4F7",
    },
    textDecoration: "none",
  },
})
