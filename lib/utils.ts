type BackendStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
type FrontendStatus = 'Not Started' | 'In Progress' | 'Completed';

export const mapStatus = {
  toBackend: (status: FrontendStatus): BackendStatus => {
    const map: Record<FrontendStatus, BackendStatus> = {
      'Not Started': 'PENDING',
      'In Progress': 'IN_PROGRESS',
      'Completed': 'COMPLETED'
    };
    return map[status];
  },
  toFrontend: (status: BackendStatus): FrontendStatus => {
    const map: Record<BackendStatus, FrontendStatus> = {
      'PENDING': 'Not Started',
      'IN_PROGRESS': 'In Progress',
      'COMPLETED': 'Completed'
    };
    return map[status];
  }
};
