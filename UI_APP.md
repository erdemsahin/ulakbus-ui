# UI APP

## Supported Devices
Firefox, Chrome, Safari, Internet Explorer

## Web Socket Connection / Session Management
Web socket connection starts just after session cookie is set and is closed by
end of the session. We aim all communication between backend and UI should be
passed through web socket connection. On any page async messages (requests) and
their responses must be handled properly and respectful for session state. XHR
also is an alternative and must work when session expires or is needed to be
refreshed or users try to view page by clicking an external URL. Page views by
an external URL must be handled properly, users must be redirected login page
if they are not already signed in, and after successful login, they must be
redirected back the page which they are looking for by establishing web socket
connection properly.

Simply, communication between UI and Backend can be separated into two type:
- **Workflows and views** well defined, structured json strings including all
UI components, computed data and workflow metadata are sent via web sockets
- **Instant Chat** message and channel data

## Components
Form, form elements (standard html ones buttons, inputs, text-areas, select and
nonstandard ones  date / time pickers, date range, integer range, email, file,
typeahead inputs, etc..), widgets (table, data grid, chart, message box, avatar,
calendar, task manager, etc..) are independent components and their main
properties can be configured. Also they can be combined e.g a pie chart can have
a button or a message box can have some buttons even if they are not form or app
doesn't expect any data from these components.

## Page Structure
A page is composed of permanent and nonpermanent elements listed below:

- Header
- Main Navigation Menu
- Content Area
- Footer

## Page Types by Layout

- Dashboard
- WorkFlow Step
- WorkFLow Step with a sidebar

## Page / Component Behaviors

- Show the content when it is ready
- Do not allow pressing buttons and links twice, disable it when it is pressed
or do not send data to backend
- Show a loading / processing indicator between screens, it may overlay whole screen to prevent user clicking other buttons. `Message Box` must be always visible.
- Long term tasks (ui will be informed by backend, e.g backend sends button
attributes such as `<button cmd="get_report" long_term="true">`) and tasks
which it takes too long getting response from backend, can be sent
background by informing user.


## Component List

- **Form** - HTML form element.
- **Text Input** Standard text input.
- **Integer Input** Standard text input for integers with valid integer, max
and min value validation.
- **Integer Range** is special `Integer Input` with two field for max and min
- **Email Input** Email text input with standard email validation.
- **URL Input** URL text input with URL validation.
- **Password Input**
- **Date** is widget for dates with a date picker.
- **Date Range** is a special `Date` widget with two picker.
- **Time** is widget for time with a time picker.
- **Time Range** is a special `Time` widget with two picker.
- **Datetime** is a widget for date-time with pickers both date and time
- **Dateime Range** is a special `Datetime` widget with two picker.
- **Button** classical form buttons with guiding colors.
  - **Submit** validates and sends form data if a related form exists, or
  just its value and attribute data such as `cmd`, `flow` which are used to
  tell backend (workflow engine) about next steps.
  - **Cancel** ignore validation and just sends backend its value and attribute
  data.
- **File** input for files.
  - **Image** with preview
  - **Document** with mime-type icon
- **Select** Static, model or custom view data source and typeahead search in
data source (even static)
  - **Single**
  - **Multiple**
- **Checkbox** for boolean fields.
- **Radio Group** for enumerated options.
- **Simple Text**
- **Markup Text**
- **Tabs**
- **Table**
- **List**
- **Video**
- **Image**
- **Progress Bar**
- **Modal**
- **Breadcrumb**
- **Selected Object Menu** This widget appears when an item is selected and
includes WF links which can be executed for selected item.
- **Data Grid** is fully configurable and can be fed by external data sources or
static data.
- **General Report Widget** is a `Data Grid` widget which is bundled with a
column selector. Its column data, view for data source and filter options are
defined by backend.
- **Alert Box** is simple popups generally is for critical warnings.
- **Message Box** is generally used to inform users about results of operations
while they are proceeding through workflow steps.
- **Charts**
- **Map**
- **Message Box** is an interactive widget allows user to see messages in
private and public channels and send new messages.