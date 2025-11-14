// src/components/Sidebar.jsx
function Sidebar({ activePage, onChangePage }) {
  const menuItems = [
    { id: "home", label: "Home" },
    { id: "FeaturePrograms", label: "FeaturePrograms" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Logo</div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={
              "sidebar-link" + (activePage === item.id ? " active" : "")
            }
            onClick={() => onChangePage(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
