# Stage 1

## Campus Notifications - Priority Inbox Logic

### 1. How the Sorting Algorithm Works

To make sure students don't miss important updates due to too many messages, I built a sorting system for the "Priority Inbox". The sorting is based on two things: **Notification Type (Weight)** and **Recency (Timestamp)**.

- **Priority by Type:** Placement notifications are the most important, followed by Results, and then standard Events.
  - `Placement` (Weight = 3)
  - `Result` (Weight = 2)
  - `Event` (Weight = 1)

**Tie-Breaking Rule:** If two notifications have the same type (for example, two Results), the code compares their timestamps and puts the newest one first.

### 2. Time and Space Complexity Analysis

- **Time Complexity:** \* **Fetching the data:** Reading the raw list of notifications from the API takes $O(N)$ time, where $N$ is the total number of notifications returned.
  - **Sorting:** The standard JavaScript `.sort()` method runs in $O(N \log N)$ time. It loops through the notifications, compares their weights, and checks the timestamps if the weights are equal.
  - **Slicing the Top 10:** Extracting just the top 10 items takes a constant $O(1)$ or $O(n)$ time where $n=10$.
  - **Overall Time Complexity:** $O(N \log N)$.
  - _Note on Efficiency:_ If the number of notifications becomes massive in the future, sorting the whole array over and over will slow down. To optimize it for scale, we could use a **Min-Heap (Priority Queue)** limited to a size of 10. This would bring the time complexity down to a much faster $O(N \log 10)$.

- **Space Complexity:** \* The space complexity is $O(N)$ because we are storing the fetched list of $N$ notifications in memory before sorting and slicing them.

---

## Stage 2

## Responsive Frontend Dashboard

### 1. React Component and State Setup

The frontend is built using React and styled entirely with Material UI (MUI) components. I used a few key pieces of state to keep the UI reactive and fast:

- `allNotifications`: Stores the complete list of updates fetched from the API to show in the main feed.
- `priorityNotifications`: Keeps track of just the top 10 sorted items for the Priority Inbox side panel.
- `readIds`: An array that holds the IDs of notifications the user clicks "Mark Read" on.

**Tracking Read/Unread Status:**
Instead of mutating the original notification objects, I save clicked IDs into the `readIds` array. When rendering the lists, the code checks if the notification's ID exists in this array. If it does, it dynamically updates the MUI component's styling (lowering the `opacity` to `0.5` and making the text normal instead of bold) to show it has been viewed.

### 2. Layout & Responsiveness

To make sure the app looks good on both laptops and mobile phones, I used Material UI's `<Grid>` component system:

- **Desktop View:** The dashboard splits the screen into a two-column layout. The left column takes up more space (`md={7}`) for the general filterable feed, and the right column takes up (`md={5}`) to cleanly display the Priority Inbox right next to it.
- **Mobile View:** When the screen width shrinks below 960px, the grid automatically snaps both columns into a single vertical layout (`xs={12}`). The Priority Inbox smoothly moves below the main feed, preventing the text from getting squished or cut off.
