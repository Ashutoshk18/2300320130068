import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  Divider,
  Chip,
  Tabs,
  Tab,
  Box,
  Alert,
  CircularProgress,
  Button,
} from "@mui/material";
import { Campaign, Assignment, Star } from "@mui/icons-material";
import { fetchNotifications } from "./api";

const PRIORITY_MAP = { Placement: 3, Result: 2, Event: 1 };

export default function App() {
  const [allNotifications, setAllNotifications] = useState([]);
  const [priorityNotifications, setPriorityNotifications] = useState([]);
  const [readIds, setReadIds] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchNotifications({ limit: 10 });
        setAllNotifications(data);

        const sorted = [...data].sort((a, b) => {
          if (PRIORITY_MAP[a.Type] !== PRIORITY_MAP[b.Type]) {
            return PRIORITY_MAP[b.Type] - PRIORITY_MAP[a.Type];
          }
          return new Date(b.Timestamp) - new Date(a.Timestamp);
        });
        setPriorityNotifications(sorted.slice(0, 10));
        setError(null);
      } catch (err) {
        setError("Failed to stream real-time campus notification updates.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleMarkAsRead = (id) => {
    if (!readIds.includes(id)) {
      setReadIds([...readIds, id]);
    }
  };

  const getFilteredNotifications = () => {
    const types = [null, "Placement", "Result", "Event"];
    const currentType = types[activeTab];
    if (!currentType) return allNotifications;
    return allNotifications.filter((n) => n.Type === currentType);
  };

  const getIcon = (type) => {
    if (type === "Placement") return <Star color="warning" sx={{ mr: 1 }} />;
    if (type === "Result") return <Assignment color="primary" sx={{ mr: 1 }} />;
    return <Campaign color="action" sx={{ mr: 1 }} />;
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 3 }}
      >
        Campus Notifications Dashboard
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Left Column: Filterable Feed */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" gutterBottom color="text.secondary">
              General Feed
            </Typography>
            <Tabs
              value={activeTab}
              onChange={(e, v) => setActiveTab(v)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ mb: 2 }}
            >
              <Tab label="All Updates" />
              <Tab label="Placements" />
              <Tab label="Results" />
              <Tab label="Events" />
            </Tabs>

            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                maxHeight: "65vh",
                overflow: "auto",
              }}
            >
              {getFilteredNotifications().map((notif) => {
                const isRead = readIds.includes(notif.ID);
                return (
                  <React.Fragment key={notif.ID}>
                    <ListItem
                      alignItems="flex-start"
                      sx={{ opacity: isRead ? 0.5 : 1, transition: "0.2s" }}
                      secondaryAction={
                        !isRead && (
                          <Button
                            size="small"
                            onClick={() => handleMarkAsRead(notif.ID)}
                          >
                            Mark Read
                          </Button>
                        )
                      }
                    >
                      {getIcon(notif.Type)}

                      {/* FIX: Completely replaced ListItemText with safe div structure */}
                      <Box sx={{ flexGrow: 1, ml: 1, pr: 8 }}>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: isRead ? "normal" : "bold" }}
                        >
                          {notif.Message}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.5,
                            mt: 0.5,
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            {notif.Timestamp}
                          </Typography>
                          <Box>
                            <Chip
                              label={notif.Type}
                              size="small"
                              color={
                                notif.Type === "Placement"
                                  ? "warning"
                                  : "default"
                              }
                            />
                          </Box>
                        </Box>
                      </Box>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                );
              })}
            </List>
          </Paper>
        </Grid>

        {/* Right Column: Bounded Priority Inbox */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 2, bgcolor: "#fafafa", border: "1px solid #e0e0e0" }}>
            <Typography
              variant="h6"
              gutterBottom
              color="error.main"
              sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
            >
              <Star sx={{ mr: 1 }} /> Priority Inbox (Top 10)
            </Typography>
            <Typography
              variant="caption"
              display="block"
              sx={{ mb: 2, color: "text.secondary" }}
            >
              Weighted Engine Sorting: Placements &gt; Results &gt; Events
            </Typography>

            <List sx={{ width: "100%" }}>
              {priorityNotifications.map((notif, index) => {
                const isRead = readIds.includes(notif.ID);
                return (
                  <React.Fragment key={notif.ID}>
                    <ListItem
                      alignItems="flex-start"
                      onClick={() => handleMarkAsRead(notif.ID)}
                      sx={{
                        cursor: "pointer",
                        opacity: isRead ? 0.4 : 1,
                        bgcolor: isRead ? "transparent" : "#fff",
                        mb: 1,
                        borderRadius: 1,
                        boxShadow: isRead
                          ? "none"
                          : "0px 2px 4px rgba(0,0,0,0.05)",
                      }}
                    >
                      <Box
                        sx={{
                          mr: 2,
                          fontWeight: "bold",
                          color: "text.secondary",
                          minWidth: "20px",
                        }}
                      >
                        #{index + 1}
                      </Box>

                      {/* FIX: Replaced ListItemText here as well to remove hidden <p> tags */}
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: isRead ? "normal" : "bold" }}
                        >
                          {notif.Message}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${notif.Type} • ${notif.Timestamp}`}
                        </Typography>
                      </Box>
                    </ListItem>
                  </React.Fragment>
                );
              })}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
