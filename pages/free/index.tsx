import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
// import Navbar from '../../Components/Navbar';
// import Dashboard from '../../Components/Dashboardleft';

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  leftChild?: string;
  rightChild?: string;
}

interface TreeNodeProps {
  user: User;
  left: TreeNodeProps | null;
  right: TreeNodeProps | null;
}

const createBinaryTree = (users: User[]): Map<string, TreeNodeProps> => {
  const userMap = new Map<string, TreeNodeProps>();

  users.forEach(user => {
    userMap.set(user._id, { user, left: null, right: null });
  });

  users.forEach(user => {
    const node = userMap.get(user._id);
    if (user.leftChild && userMap.has(user.leftChild)) {
      node!.left = userMap.get(user.leftChild)!;
    }
    if (user.rightChild && userMap.has(user.rightChild)) {
      node!.right = userMap.get(user.rightChild)!;
    }
  });

  return userMap;
};

const TreeNode = ({ node, onClick }: { node: TreeNodeProps | null, onClick: (node: TreeNodeProps) => void }) => {
  if (!node) return null;

  return (
    <div className={styles.node} onClick={() => onClick(node)}>
      <div className={styles.icon}>
        <i className="fas fa-user"></i>
      </div>
      <div className={styles.name}>{node.user.name}</div>
      <div className={styles.email}>{node.user.email}</div>
      <div className={styles.id}>ID: {node.user._id}</div>
    </div>
  );
};

const Index = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userMap, setUserMap] = useState<Map<string, TreeNodeProps> | null>(null);
  const [currentNode, setCurrentNode] = useState<TreeNodeProps | null>(null);
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:3000/auth/all');
      const data: User[] = await response.json();
      setUsers(data);
      const map = createBinaryTree(data);
      setUserMap(map);

      if (data.length > 0) {
        setCurrentNode(map.get(data[0]._id) || null);
      }
    };

    fetchUsers();
  }, []);

  const handleNodeClick = (node: TreeNodeProps) => {
    setCurrentNode(node);
  };

  const renderInitialNodes = (node: TreeNodeProps | null) => {
    if (!node) return null;

    const children: TreeNodeProps[] = [];
    if (node.left) children.push(node.left);
    if (node.right) children.push(node.right);

    return (
      <div className={styles.children}>
        {children.map((child, index) => (
          <div key={child.user._id} className={styles.child}>
            <div className={index === 0 ? styles.lineleft : styles.lineright}></div>
            <TreeNode node={child} onClick={handleNodeClick} />
          </div>
        ))}
      </div>
    );
  };

  const renderCompleteTree = (node: TreeNodeProps | null): JSX.Element | null => {
    if (!node) return null;

    return (
      <div>
        <TreeNode node={node} onClick={handleNodeClick} />
        <div className={styles.children}>
          {node.left && (
            <div className={styles.child}>
              <div className={styles.lineleft}></div>
              {renderCompleteTree(node.left)}
            </div>
          )}
          {node.right && (
            <div className={styles.child}>
              <div className={styles.lineright}></div>
              {renderCompleteTree(node.right)}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* <Navbar /> */}
      <div style={{ display: 'flex', height: 'auto' }}>
        {/* <Dashboard /> */}
        <div className={styles.container}>
          <div className={styles.tree}>
            <div className={styles.admin}>
              <div className={styles.icon}>
                <i className="fas fa-user-shield"></i>
              </div>
              <div className={styles.name}>Admin</div>
            </div>
            {currentNode && (
              <div>
                {viewAll ? (
                  renderCompleteTree(currentNode)
                ) : (
                  <>
                    <TreeNode node={currentNode} onClick={handleNodeClick} />
                    {renderInitialNodes(currentNode)}
                  </>
                )}
                <button className={styles.viewAllButton} onClick={() => setViewAll(!viewAll)}>
                  {viewAll ? 'Show Less' : 'View All'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
