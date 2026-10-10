const fs = require('fs');

const path = 'c:/Users/DIVYASRIREDDY/OneDrive/Desktop/NECTO/frontend/src/context/AppDataContext.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace("import { INITIAL_CREATORS } from '../data/mockCreators';", "import { INITIAL_CREATORS } from '../data/mockCreators';\nimport { campaignApi } from '../services/api';");

content = content.replace(
  "addCampaign: (campaignData: Omit<Campaign, 'id' | 'applicationsCount' | 'createdAt'>) => Campaign;",
  "addCampaign: (campaignData: Omit<Campaign, 'id' | 'applicationsCount' | 'createdAt'>) => Promise<Campaign | undefined>;"
);
content = content.replace(
  "editCampaign: (campaignId: string, updates: Partial<Campaign>) => void;",
  "editCampaign: (campaignId: string, updates: Partial<Campaign>) => Promise<void>;"
);
content = content.replace(
  "deleteCampaign: (campaignId: string) => void;",
  "deleteCampaign: (campaignId: string) => Promise<void>;"
);

// We need to fetch campaigns from backend in a useEffect
content = content.replace(
  "// Local storage synchronizers",
  `useEffect(() => {
    campaignApi.getCampaigns().then(res => {
      setCampaigns(res.data);
    }).catch(err => {
      console.error("Failed to load campaigns", err);
    });
  }, []);

  // Local storage synchronizers`
);

// update addCampaign
content = content.replace(
  "const addCampaign = (campaignData: Omit<Campaign, 'id' | 'applicationsCount' | 'createdAt'>) => {",
  "const addCampaign = async (campaignData: Omit<Campaign, 'id' | 'applicationsCount' | 'createdAt'>) => {\n    try {\n      const res = await campaignApi.createCampaign(campaignData);\n      const newCamp = res.data;"
);
content = content.replace(
  "const newCamp: Campaign = {\n      ...campaignData,\n      id: `camp-${Date.now().toString(36)}`,\n      applicationsCount: 0,\n      createdAt: new Date().toISOString().split('T')[0]\n    };\n    setCampaigns(prev => [newCamp, ...prev]);",
  "setCampaigns(prev => [newCamp, ...prev]);"
);
content = content.replace(
  "return newCamp;\n  };",
  "return newCamp;\n    } catch (err) {\n      error('Error', 'Failed to create campaign');\n    }\n  };"
);

// update editCampaign
content = content.replace(
  "const editCampaign = (campaignId: string, updates: Partial<Campaign>) => {\n    setCampaigns(prev => prev.map(c => (c.id === campaignId ? { ...c, ...updates } : c)));\n    success('Campaign Updated', 'Your campaign modifications have been saved in demo state.');\n  };",
  "const editCampaign = async (campaignId: string, updates: Partial<Campaign>) => {\n    try {\n      const res = await campaignApi.updateCampaign(campaignId, updates);\n      setCampaigns(prev => prev.map(c => (c.id === campaignId ? { ...c, ...res.data } : c)));\n      success('Campaign Updated', 'Your campaign modifications have been saved.');\n    } catch (err) {\n      error('Error', 'Failed to update campaign');\n    }\n  };"
);

// update deleteCampaign
content = content.replace(
  "const deleteCampaign = (campaignId: string) => {\n    setCampaigns(prev => prev.filter(c => c.id !== campaignId));\n    info('Campaign Deleted', 'Campaign removed from active listings.');\n  };",
  "const deleteCampaign = async (campaignId: string) => {\n    try {\n      await campaignApi.deleteCampaign(campaignId);\n      setCampaigns(prev => prev.filter(c => c.id !== campaignId));\n      info('Campaign Deleted', 'Campaign removed from active listings.');\n    } catch (err) {\n      error('Error', 'Failed to delete campaign');\n    }\n  };"
);

fs.writeFileSync(path, content, 'utf8');
