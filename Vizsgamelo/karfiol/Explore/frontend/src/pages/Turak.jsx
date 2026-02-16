import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import { TOURS } from "../data/tours";

export default function Turak() {
  return (
    <Container sx={{ pt: 12, pb: 6 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.6 }}>
          Túrák
        </Typography>
        <Typography sx={{ opacity: 0.75 }}>
          Összesen <b>{TOURS.length}</b> túra – katt a <b>Megnézem</b> gombra a részletekért.
        </Typography>
      </Box>

      <Grid container spacing={2.2}>
        {TOURS.map((t) => (
          <Grid item xs={12} sm={6} md={4} key={t.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia component="img" image={t.cover} alt={t.title} sx={{ height: 170, objectFit: "cover" }} />
              <CardContent sx={{ flex: 1 }}>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Chip
                    size="small"
                    label={t.tag}
                    sx={{
                      bgcolor: "rgba(255,255,255,.10)",
                      border: "1px solid rgba(255,255,255,.16)",
                    }}
                  />
                  <Chip
                    size="small"
                    label={t.difficulty}
                    sx={{
                      bgcolor: "rgba(46,204,113,.14)",
                      border: "1px solid rgba(46,204,113,.25)",
                      color: "rgba(255,255,255,.92)",
                    }}
                  />
                </Stack>

                <Typography sx={{ fontWeight: 900, mb: 0.6 }}>{t.title}</Typography>
                <Typography sx={{ opacity: 0.75, fontSize: 13, minHeight: 44 }}>{t.shortDesc}</Typography>

                <Stack direction="row" justifyContent="space-between" sx={{ mt: 1.2 }}>
                  <Typography sx={{ opacity: 0.8, fontSize: 13 }}>{t.duration}</Typography>
                  <Typography sx={{ fontWeight: 900, fontSize: 13 }}>
                    {Number(t.priceFt || 0).toLocaleString("hu-HU")} Ft
                  </Typography>
                </Stack>
              </CardContent>

              <Box sx={{ p: 1.6, pt: 0 }}>
                <Button component={RouterLink} to={`/turak/${t.slug}`} variant="contained" fullWidth>
                  Megnézem
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
