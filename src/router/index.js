import Index from '@/components/Index';
import Introduction from '@/components/Introduction';
import FileLoader from '@/components/FileLoader';
import ManualLoader from '@/components/ManualLoader';

export default [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/introduction',
    name: 'Introduction',
    component: Introduction,
  },
  {
    path: '/fileLoader',
    name: 'FileLoader',
    component: FileLoader,
  },
  {
    path: '/manualLoader',
    name: 'ManualLoader',
    component: ManualLoader,
  },
];
