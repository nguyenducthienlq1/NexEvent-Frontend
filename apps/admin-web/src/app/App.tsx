import { useState } from "react";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { CheckinPage } from "../features/checkin/pages/CheckinPage";
import { DashboardPage } from "../features/dashboard/pages/DashboardPage";
import { EventsPage } from "../features/events/pages/EventsPage";
import { useEvents } from "../features/events/hooks/useEvents";
import { TicketTypesPage } from "../features/tickets/pages/TicketTypesPage";
import { useTicketTypes } from "../features/tickets/hooks/useTickets";
import { authStore } from "../stores/auth.store";
import type { UserLogin } from "../features/auth/types";
import type { EventItem } from "../features/events/types";
import type { TicketType } from "../features/tickets/types";
import type { ViewKey } from "../types/common";
import "../styles/app.css";

const noEvents: EventItem[] = [];
const noTickets: TicketType[] = [];

export default function App() {
  const [view, setView] = useState<ViewKey>("dashboard");
  const [user, setUser] = useState<UserLogin | null>(authStore.getUser());
  const [selectedEventId, setSelectedEventId] = useState(0);

  const eventsQuery = useEvents();
  const events = eventsQuery.data?.content ?? noEvents;
  const activeEventId = selectedEventId || events[0]?.id || 0;

  const ticketsQuery = useTicketTypes(activeEventId);
  const tickets = ticketsQuery.data?.content ?? noTickets;

  if (!authStore.getToken()) {
    return <LoginPage onLoggedIn={setUser} />;
  }

  return (
    <div className="appShell">
      <Sidebar
        currentView={view}
        user={user}
        onNavigate={setView}
        onSignOut={() => {
          authStore.clear();
          setUser(null);
        }}
      />

      <main className="workspace">
        <Header
          currentView={view}
          events={events}
          activeEventId={activeEventId}
          onSelectEvent={setSelectedEventId}
          onRefresh={() => eventsQuery.refetch()}
          onNavigate={setView}
        />

        {eventsQuery.isError && (
          <div className="notice danger">
            Could not load admin data. Check API URL, token role, and backend
            availability.
          </div>
        )}

        {view === "dashboard" && (
          <DashboardPage
            activeEventId={activeEventId}
            events={events}
            tickets={tickets}
          />
        )}
        {view === "events" && (
          <EventsPage events={events} loading={eventsQuery.isLoading} />
        )}
        {view === "tickets" && (
          <TicketTypesPage
            events={events}
            selectedEventId={activeEventId}
            tickets={tickets}
            loading={ticketsQuery.isLoading}
          />
        )}
        {view === "checkin" && <CheckinPage />}
      </main>
    </div>
  );
}
