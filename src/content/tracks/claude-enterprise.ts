// Claude Enterprise Mastery - Track Content
// Admin console, SSO/SAML, SCIM, Slack integration, and team management for organizations

import type { TrackLevel, LevelContent } from '@/lib/types';

export const CLAUDE_ENTERPRISE_TRACK_ID = 'claude-enterprise';
export const CLAUDE_ENTERPRISE_COLOR = '#F59E0B';

export const claudeEnterpriseLevels: Omit<TrackLevel, 'id' | 'trackId'>[] = [
  // Level 1: Enterprise Overview
  {
    levelNumber: 1,
    title: 'Enterprise Overview',
    description: 'Understand what Claude Enterprise offers and how it transforms organizational AI adoption',
    xpReward: 150,
    estimatedMinutes: 15,
    isFree: true,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'ce1-1',
          type: 'text',
          title: 'What is Claude Enterprise?',
          content: `<p>Claude Enterprise is Anthropic's comprehensive AI solution designed for organizations that need advanced security, compliance, and management capabilities:</p>
<ul>
  <li><strong>Enterprise-grade security</strong> - SOC 2 Type II compliance, data encryption, and privacy controls</li>
  <li><strong>Centralized administration</strong> - Manage users, permissions, and policies from a single console</li>
  <li><strong>Identity integration</strong> - SSO/SAML and SCIM for seamless user provisioning</li>
  <li><strong>Collaboration tools</strong> - Slack integration for team-wide AI access</li>
  <li><strong>Audit and compliance</strong> - Comprehensive logging and monitoring</li>
</ul>`
        },
        {
          id: 'ce1-2',
          type: 'text',
          title: 'Key Benefits for Organizations',
          content: `<p>Claude Enterprise addresses critical organizational needs:</p>
<ul>
  <li><strong>Data privacy</strong> - Your data is never used to train models</li>
  <li><strong>Extended context</strong> - 500K token context window for complex documents</li>
  <li><strong>Higher rate limits</strong> - Increased capacity for enterprise workloads</li>
  <li><strong>Priority support</strong> - Dedicated account management and technical support</li>
  <li><strong>Custom agreements</strong> - Flexible contracts and SLAs</li>
</ul>`
        },
        {
          id: 'ce1-3',
          type: 'tip',
          title: 'Enterprise vs Team Plans',
          content: 'While Claude Team provides basic collaboration features, Enterprise adds SSO/SAML authentication, SCIM provisioning, advanced admin controls, audit logs, and dedicated support. Choose Enterprise when compliance, security, and centralized management are priorities.'
        },
        {
          id: 'ce1-4',
          type: 'text',
          title: 'Security and Compliance',
          content: `<p>Claude Enterprise meets stringent security requirements:</p>
<ul>
  <li><strong>SOC 2 Type II</strong> - Independently audited security controls</li>
  <li><strong>HIPAA eligible</strong> - Available for healthcare organizations with BAA</li>
  <li><strong>Data residency</strong> - Control where your data is processed</li>
  <li><strong>Encryption</strong> - Data encrypted at rest and in transit</li>
  <li><strong>Zero retention</strong> - Option to disable conversation storage</li>
</ul>`
        },
        {
          id: 'ce1-5',
          type: 'text',
          title: 'Getting Started',
          content: `<p>To begin your Enterprise journey:</p>
<ol>
  <li>Contact Anthropic sales for a custom quote and contract</li>
  <li>Work with your account team to define requirements</li>
  <li>Receive your organization's admin console access</li>
  <li>Configure identity provider integration (SSO/SAML)</li>
  <li>Set up user provisioning and permissions</li>
  <li>Deploy to your teams with proper training</li>
</ol>`
        }
      ]
    } as LevelContent
  },

  // Level 2: Admin Console Setup
  {
    levelNumber: 2,
    title: 'Admin Console Setup',
    description: 'Set up and navigate the Claude Enterprise admin console',
    xpReward: 150,
    estimatedMinutes: 15,
    isFree: true,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'ce2-1',
          type: 'text',
          title: 'Admin Console Overview',
          content: `<p>The Claude Enterprise admin console is your central hub for organization management:</p>
<ul>
  <li><strong>Dashboard</strong> - Usage metrics, active users, and alerts at a glance</li>
  <li><strong>Users</strong> - Manage team members and their access levels</li>
  <li><strong>Groups</strong> - Organize users into logical teams or departments</li>
  <li><strong>Settings</strong> - Configure organization-wide policies and integrations</li>
  <li><strong>Audit logs</strong> - Review activity and compliance reports</li>
</ul>`
        },
        {
          id: 'ce2-2',
          type: 'text',
          title: 'Initial Configuration Steps',
          content: `<p>After receiving admin access, complete these setup steps:</p>
<ol>
  <li>Log in to console.anthropic.com with your admin credentials</li>
  <li>Navigate to Organization Settings to verify your company details</li>
  <li>Set up your organization's display name and branding</li>
  <li>Configure default user settings and permissions</li>
  <li>Review and accept the Enterprise terms of service</li>
</ol>`
        },
        {
          id: 'ce2-3',
          type: 'code',
          title: 'Admin Console URL Structure',
          language: 'text',
          content: `# Main console access
https://console.anthropic.com/organization

# Key sections
/organization/dashboard     - Usage overview
/organization/members       - User management
/organization/groups        - Team groups
/organization/settings      - Configuration
/organization/security      - SSO and security settings
/organization/audit-logs    - Activity logs`
        },
        {
          id: 'ce2-4',
          type: 'tip',
          title: 'Multiple Admins',
          content: 'We recommend having at least two organization admins to ensure continuity. Admins can be designated as "Owner" (full control) or "Admin" (management without billing access). Store admin credentials securely and enable MFA for all admin accounts.'
        },
        {
          id: 'ce2-5',
          type: 'text',
          title: 'Dashboard Metrics',
          content: `<p>The admin dashboard provides real-time insights:</p>
<ul>
  <li><strong>Active users</strong> - Daily and monthly active user counts</li>
  <li><strong>Message volume</strong> - Total conversations and messages</li>
  <li><strong>Token usage</strong> - Input and output token consumption</li>
  <li><strong>Feature adoption</strong> - Usage of Projects, artifacts, and integrations</li>
  <li><strong>Cost tracking</strong> - Current spend against your contract</li>
</ul>`
        },
        {
          id: 'ce2-6',
          type: 'warning',
          title: 'Security First',
          content: 'Before inviting users, ensure you have configured SSO (if required), set appropriate default permissions, and established usage policies. Proper initial configuration prevents security gaps and simplifies ongoing management.'
        }
      ]
    } as LevelContent
  },

  // Level 3: SSO/SAML Configuration
  {
    levelNumber: 3,
    title: 'SSO/SAML Configuration',
    description: 'Configure single sign-on with your identity provider',
    xpReward: 200,
    estimatedMinutes: 25,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'ce3-1',
          type: 'text',
          title: 'Understanding SSO for Claude',
          content: `<p>Single Sign-On (SSO) enables users to access Claude with their corporate credentials:</p>
<ul>
  <li><strong>Centralized authentication</strong> - Users log in with existing corporate accounts</li>
  <li><strong>Improved security</strong> - Leverage your IdP's security policies (MFA, password requirements)</li>
  <li><strong>Automatic provisioning</strong> - Users can be created on first login</li>
  <li><strong>Instant deprovisioning</strong> - Disable IdP account to revoke Claude access</li>
</ul>`
        },
        {
          id: 'ce3-2',
          type: 'text',
          title: 'Supported Identity Providers',
          content: `<p>Claude Enterprise supports SAML 2.0 with these popular IdPs:</p>
<ul>
  <li><strong>Okta</strong> - Full integration with pre-built application</li>
  <li><strong>Azure AD / Entra ID</strong> - Enterprise application support</li>
  <li><strong>Google Workspace</strong> - SAML app configuration</li>
  <li><strong>OneLogin</strong> - Connector available</li>
  <li><strong>Any SAML 2.0 IdP</strong> - Custom configuration supported</li>
</ul>`
        },
        {
          id: 'ce3-3',
          type: 'code',
          title: 'SAML Configuration Values',
          language: 'text',
          content: `# Values to provide to your Identity Provider
ACS URL (Assertion Consumer Service):
https://console.anthropic.com/api/auth/sso/saml/callback

Entity ID (Audience URI):
https://console.anthropic.com/saml/metadata

# Required SAML Attributes
email        - User's email address (required)
firstName    - User's first name (optional)
lastName     - User's last name (optional)
groups       - Group memberships for SCIM (optional)`
        },
        {
          id: 'ce3-4',
          type: 'text',
          title: 'Okta Configuration Steps',
          content: `<p>To configure SSO with Okta:</p>
<ol>
  <li>In Okta Admin, go to Applications > Create App Integration</li>
  <li>Select SAML 2.0 as the sign-in method</li>
  <li>Enter "Claude Enterprise" as the app name</li>
  <li>Configure the SAML settings with the ACS URL and Entity ID</li>
  <li>Map attributes: user.email to email, user.firstName to firstName</li>
  <li>Download the IdP metadata XML or copy the SSO URL and certificate</li>
  <li>In Claude Admin Console, upload the metadata or enter values manually</li>
  <li>Assign users or groups in Okta to grant access</li>
</ol>`
        },
        {
          id: 'ce3-5',
          type: 'code',
          title: 'Azure AD Configuration',
          language: 'text',
          content: `# Azure AD / Entra ID Setup

1. Go to Azure Portal > Enterprise Applications
2. Click "New Application" > "Create your own application"
3. Name: "Claude Enterprise"
4. Select "Integrate any other application (Non-gallery)"

# SAML Configuration
Basic SAML Configuration:
  Identifier (Entity ID): https://console.anthropic.com/saml/metadata
  Reply URL (ACS): https://console.anthropic.com/api/auth/sso/saml/callback

# User Attributes & Claims
Required claims:
  email: user.mail
  firstName: user.givenname
  lastName: user.surname`
        },
        {
          id: 'ce3-6',
          type: 'tip',
          title: 'Testing SSO',
          content: 'Always test SSO configuration with a non-admin account first. Keep at least one admin with password login as a backup until SSO is confirmed working. Use your IdP\'s SAML debugging tools to troubleshoot assertion issues.'
        },
        {
          id: 'ce3-7',
          type: 'warning',
          title: 'Enforcing SSO',
          content: 'Once SSO is working, you can enforce it for all users. This disables password login entirely. Ensure you have a break-glass procedure documented before enabling enforcement, such as a backup admin account or IdP bypass.'
        }
      ],
      exercise: {
        type: 'prompt',
        instructions: 'Document the SSO configuration plan for your organization. Include: which identity provider you will use, the key configuration values needed, the testing procedure, and the rollout plan for enabling SSO enforcement.',
        hints: [
          'Specify your IdP and why it was chosen',
          'List the SAML attributes you will map',
          'Include a testing checklist before enforcement',
          'Plan for break-glass admin access'
        ],
        validationCriteria: [
          'Identifies the identity provider',
          'Lists required configuration values',
          'Includes testing procedure',
          'Has a rollout and enforcement plan'
        ]
      }
    } as LevelContent
  },

  // Level 4: SCIM Provisioning
  {
    levelNumber: 4,
    title: 'SCIM Provisioning',
    description: 'Set up automated user provisioning with SCIM',
    xpReward: 200,
    estimatedMinutes: 20,
    isFree: false,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'ce4-1',
          type: 'text',
          title: 'What is SCIM?',
          content: `<p>SCIM (System for Cross-domain Identity Management) automates user lifecycle management:</p>
<ul>
  <li><strong>Automatic provisioning</strong> - Create users when added to IdP groups</li>
  <li><strong>Automatic deprovisioning</strong> - Remove access when users leave</li>
  <li><strong>Profile sync</strong> - Keep user details updated automatically</li>
  <li><strong>Group sync</strong> - Mirror IdP groups to Claude permissions</li>
</ul>`
        },
        {
          id: 'ce4-2',
          type: 'text',
          title: 'SCIM Benefits',
          content: `<p>SCIM provides significant operational advantages:</p>
<ul>
  <li><strong>Zero manual work</strong> - No need to manually add/remove users</li>
  <li><strong>Instant offboarding</strong> - Access revoked immediately when employees leave</li>
  <li><strong>Compliance</strong> - Audit trail of all provisioning actions</li>
  <li><strong>Consistency</strong> - User data stays in sync with your source of truth</li>
</ul>`
        },
        {
          id: 'ce4-3',
          type: 'code',
          title: 'SCIM Endpoint Configuration',
          language: 'text',
          content: `# SCIM API Endpoint
Base URL: https://console.anthropic.com/api/scim/v2

# Supported SCIM Operations
GET    /Users           - List all users
GET    /Users/{id}      - Get specific user
POST   /Users           - Create user
PATCH  /Users/{id}      - Update user
DELETE /Users/{id}      - Deactivate user
GET    /Groups          - List all groups
POST   /Groups          - Create group
PATCH  /Groups/{id}     - Update group membership`
        },
        {
          id: 'ce4-4',
          type: 'code',
          title: 'Generating SCIM Token',
          language: 'text',
          content: `# In Claude Admin Console:
1. Navigate to Organization Settings > Security
2. Find the SCIM Configuration section
3. Click "Generate SCIM Token"
4. Copy the token immediately (shown only once)
5. Store securely - treat as a sensitive credential

# Token format (example)
Bearer scim_abc123def456...

# Token permissions
- Full user management (create, read, update, delete)
- Group management
- Cannot access conversations or API keys`
        },
        {
          id: 'ce4-5',
          type: 'text',
          title: 'Okta SCIM Setup',
          content: `<p>Configure SCIM provisioning in Okta:</p>
<ol>
  <li>In your Claude Okta application, go to Provisioning tab</li>
  <li>Click "Configure API Integration"</li>
  <li>Check "Enable API Integration"</li>
  <li>Enter the SCIM base URL and Bearer token</li>
  <li>Click "Test API Credentials" to verify</li>
  <li>Enable "Create Users", "Update User Attributes", "Deactivate Users"</li>
  <li>Configure attribute mappings as needed</li>
  <li>Assign groups to push to Claude</li>
</ol>`
        },
        {
          id: 'ce4-6',
          type: 'tip',
          title: 'Group-Based Access',
          content: 'Create IdP groups like "Claude-Users" and "Claude-Admins" to control access. Only users in provisioned groups will have Claude access. This makes offboarding automatic when users are removed from groups.'
        },
        {
          id: 'ce4-7',
          type: 'warning',
          title: 'SCIM Token Security',
          content: 'The SCIM token has powerful permissions. Store it only in your IdP\'s secure credential storage. Rotate the token periodically. Monitor SCIM API logs for unusual activity. If compromised, regenerate immediately in the admin console.'
        }
      ]
    } as LevelContent
  },

  // Level 5: Slack Integration
  {
    levelNumber: 5,
    title: 'Slack Integration',
    description: 'Deploy Claude to your Slack workspace for team-wide access',
    xpReward: 200,
    estimatedMinutes: 20,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'ce5-1',
          type: 'text',
          title: 'Claude in Slack',
          content: `<p>The Claude Slack integration brings AI assistance directly into your team's workflow:</p>
<ul>
  <li><strong>Direct messages</strong> - Private conversations with Claude</li>
  <li><strong>Channel mentions</strong> - @Claude in any channel for assistance</li>
  <li><strong>Thread replies</strong> - Claude maintains conversation context</li>
  <li><strong>File analysis</strong> - Share documents for Claude to analyze</li>
</ul>`
        },
        {
          id: 'ce5-2',
          type: 'text',
          title: 'Installation Requirements',
          content: `<p>Before installing Claude for Slack:</p>
<ul>
  <li><strong>Slack workspace admin</strong> - You need admin permissions to install apps</li>
  <li><strong>Claude Enterprise</strong> - Active Enterprise subscription required</li>
  <li><strong>User mapping</strong> - Decide how Slack users map to Claude users</li>
  <li><strong>Channel policies</strong> - Determine where Claude can be used</li>
</ul>`
        },
        {
          id: 'ce5-3',
          type: 'text',
          title: 'Installation Steps',
          content: `<p>Install Claude in your Slack workspace:</p>
<ol>
  <li>In Claude Admin Console, navigate to Integrations > Slack</li>
  <li>Click "Add to Slack" to begin the OAuth flow</li>
  <li>Sign in to your Slack workspace as an admin</li>
  <li>Review the permissions Claude requests</li>
  <li>Click "Allow" to complete installation</li>
  <li>Configure channel access and user permissions</li>
  <li>Announce the integration to your team</li>
</ol>`
        },
        {
          id: 'ce5-4',
          type: 'code',
          title: 'Using Claude in Slack',
          language: 'text',
          content: `# Direct message Claude
Just open a DM with @Claude and start chatting

# Mention in channels
@Claude can you summarize this discussion?

# In threads (maintains context)
@Claude what do you think about this approach?

# With file attachments
[Attach PDF] @Claude please review this document

# Slash commands
/claude help     - Show available commands
/claude feedback - Send feedback to admins`
        },
        {
          id: 'ce5-5',
          type: 'tip',
          title: 'Channel Configuration',
          content: 'You can restrict Claude to specific channels by configuring allowed channels in the admin console. This is useful for keeping Claude out of sensitive channels while enabling it in general collaboration spaces.'
        },
        {
          id: 'ce5-6',
          type: 'text',
          title: 'User Permissions',
          content: `<p>Control who can use Claude in Slack:</p>
<ul>
  <li><strong>All workspace members</strong> - Everyone can use Claude</li>
  <li><strong>Specific user groups</strong> - Only members of certain Slack user groups</li>
  <li><strong>Mapped Claude users</strong> - Only users with existing Claude accounts</li>
  <li><strong>Channel-based</strong> - Anyone in allowed channels can interact</li>
</ul>`
        },
        {
          id: 'ce5-7',
          type: 'warning',
          title: 'Data Considerations',
          content: 'Messages sent to Claude in Slack are subject to your Enterprise data policies. Remind users not to share sensitive information that should not be processed by Claude. Audit logs capture all Slack interactions for compliance.'
        }
      ],
      exercise: {
        type: 'prompt',
        instructions: 'Create a Slack integration rollout plan for your organization. Include: which channels Claude should have access to, user permission settings, announcement messaging for your team, and guidelines for appropriate use.',
        hints: [
          'Consider which channels are appropriate for AI assistance',
          'Define who should have access initially (pilot group vs everyone)',
          'Draft announcement message explaining the integration',
          'Create usage guidelines for your team'
        ],
        validationCriteria: [
          'Specifies channel access strategy',
          'Defines user permissions',
          'Includes team announcement plan',
          'Has usage guidelines'
        ]
      }
    } as LevelContent
  },

  // Level 6: Team Management
  {
    levelNumber: 6,
    title: 'Team Management',
    description: 'Manage roles, permissions, and groups for your organization',
    xpReward: 250,
    estimatedMinutes: 25,
    isFree: false,
    requiresVerification: true,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'ce6-1',
          type: 'text',
          title: 'Role-Based Access Control',
          content: `<p>Claude Enterprise provides granular role management:</p>
<ul>
  <li><strong>Owner</strong> - Full control including billing and contract management</li>
  <li><strong>Admin</strong> - User management, settings, and audit access</li>
  <li><strong>Member</strong> - Standard Claude access with configured permissions</li>
  <li><strong>Viewer</strong> - Read-only access to shared Projects</li>
</ul>`
        },
        {
          id: 'ce6-2',
          type: 'text',
          title: 'Permission Categories',
          content: `<p>Permissions can be configured across these areas:</p>
<ul>
  <li><strong>Chat access</strong> - Ability to start conversations with Claude</li>
  <li><strong>Projects</strong> - Create, edit, and share Projects</li>
  <li><strong>API access</strong> - Generate and use API keys</li>
  <li><strong>Integrations</strong> - Use Slack and other integrations</li>
  <li><strong>Admin functions</strong> - User management and settings</li>
</ul>`
        },
        {
          id: 'ce6-3',
          type: 'code',
          title: 'Managing Users via Admin Console',
          language: 'text',
          content: `# User Management Actions

View all users:
  Organization > Members > All Members

Invite new users:
  Members > Invite > Enter email(s) > Select role

Modify user role:
  Members > [User] > Edit > Change role > Save

Deactivate user:
  Members > [User] > Actions > Deactivate

Bulk operations:
  Members > Select multiple > Bulk Actions`
        },
        {
          id: 'ce6-4',
          type: 'text',
          title: 'Creating Groups',
          content: `<p>Groups help organize users by team or function:</p>
<ol>
  <li>Navigate to Organization > Groups</li>
  <li>Click "Create Group"</li>
  <li>Enter group name and description</li>
  <li>Set default permissions for group members</li>
  <li>Add users to the group manually or via SCIM</li>
  <li>Groups can be used to share Projects and set policies</li>
</ol>`
        },
        {
          id: 'ce6-5',
          type: 'code',
          title: 'Group Permission Examples',
          language: 'text',
          content: `# Engineering Team Group
Name: Engineering
Permissions:
  - Chat: Full access
  - Projects: Create and share within group
  - API: Generate keys (usage limits apply)
  - Integrations: All enabled

# Marketing Team Group
Name: Marketing
Permissions:
  - Chat: Full access
  - Projects: Create, share within group
  - API: No access
  - Integrations: Slack only

# Contractors Group
Name: External Contractors
Permissions:
  - Chat: Full access
  - Projects: View shared only
  - API: No access
  - Integrations: None`
        },
        {
          id: 'ce6-6',
          type: 'tip',
          title: 'Principle of Least Privilege',
          content: 'Start with minimal permissions and grant additional access as needed. Use groups to manage permissions at scale rather than setting individual user permissions. Review permissions quarterly to ensure they remain appropriate.'
        },
        {
          id: 'ce6-7',
          type: 'text',
          title: 'Project Sharing',
          content: `<p>Control how Projects are shared across your organization:</p>
<ul>
  <li><strong>Private</strong> - Only the creator can access</li>
  <li><strong>Group</strong> - All members of specified groups can access</li>
  <li><strong>Organization</strong> - Everyone in the organization can access</li>
  <li><strong>External</strong> - Share with users outside your organization (if enabled)</li>
</ul>`
        }
      ],
      exercise: {
        type: 'prompt',
        instructions: 'Design a group and permission structure for a hypothetical 200-person company with Engineering, Product, Marketing, Sales, and Legal departments. Define what groups to create, what permissions each should have, and how Projects should be shared between teams.',
        hints: [
          'Consider different needs for technical vs non-technical teams',
          'Think about API access requirements per department',
          'Plan for cross-functional Project sharing',
          'Include a contractor or external collaborator group'
        ],
        validationCriteria: [
          'Defines groups for each department',
          'Specifies permissions per group',
          'Addresses Project sharing strategy',
          'Considers external/contractor access'
        ]
      }
    } as LevelContent
  },

  // Level 7: Audit Logs & Compliance
  {
    levelNumber: 7,
    title: 'Audit Logs & Compliance',
    description: 'Monitor activity and maintain compliance with audit logging',
    xpReward: 250,
    estimatedMinutes: 25,
    isFree: false,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'ce7-1',
          type: 'text',
          title: 'Understanding Audit Logs',
          content: `<p>Audit logs provide a comprehensive record of all activity in your Claude Enterprise organization:</p>
<ul>
  <li><strong>User actions</strong> - Logins, logouts, and authentication events</li>
  <li><strong>Admin changes</strong> - User management, permission changes, settings updates</li>
  <li><strong>Usage activity</strong> - Conversations started, Projects created, files uploaded</li>
  <li><strong>API activity</strong> - API key usage and request logs</li>
  <li><strong>Integration events</strong> - Slack messages, external app connections</li>
</ul>`
        },
        {
          id: 'ce7-2',
          type: 'code',
          title: 'Accessing Audit Logs',
          language: 'text',
          content: `# In Admin Console
Organization > Audit Logs

# Filter options
Date range:     Last 24 hours / 7 days / 30 days / Custom
Event type:     Authentication / Admin / Usage / API / All
User:           Specific user or all users
Action:         Specific action type

# Export options
Format:         CSV / JSON
Scope:          Filtered results / All logs
Destination:    Download / SIEM integration`
        },
        {
          id: 'ce7-3',
          type: 'text',
          title: 'Event Types Logged',
          content: `<p>Key events captured in audit logs:</p>
<ul>
  <li><strong>user.login</strong> - Successful authentication</li>
  <li><strong>user.login_failed</strong> - Failed authentication attempt</li>
  <li><strong>user.created</strong> - New user provisioned</li>
  <li><strong>user.deactivated</strong> - User access removed</li>
  <li><strong>permission.changed</strong> - Role or permission modified</li>
  <li><strong>project.created</strong> - New Project created</li>
  <li><strong>project.shared</strong> - Project sharing changed</li>
  <li><strong>api_key.created</strong> - New API key generated</li>
  <li><strong>settings.modified</strong> - Organization settings changed</li>
</ul>`
        },
        {
          id: 'ce7-4',
          type: 'code',
          title: 'Sample Audit Log Entry',
          language: 'json',
          content: `{
  "timestamp": "2024-01-15T14:32:00Z",
  "event_type": "user.login",
  "actor": {
    "id": "user_abc123",
    "email": "jane.smith@company.com",
    "type": "user"
  },
  "context": {
    "ip_address": "192.168.1.100",
    "user_agent": "Mozilla/5.0...",
    "auth_method": "sso",
    "idp": "okta"
  },
  "result": "success",
  "organization_id": "org_xyz789"
}`
        },
        {
          id: 'ce7-5',
          type: 'text',
          title: 'SIEM Integration',
          content: `<p>Export audit logs to your Security Information and Event Management (SIEM) system:</p>
<ol>
  <li>Navigate to Organization > Settings > Integrations</li>
  <li>Select "Audit Log Export"</li>
  <li>Choose your SIEM platform (Splunk, Datadog, etc.)</li>
  <li>Configure the connection endpoint and credentials</li>
  <li>Set export frequency (real-time or batched)</li>
  <li>Define which event types to export</li>
  <li>Test the connection and verify data flow</li>
</ol>`
        },
        {
          id: 'ce7-6',
          type: 'tip',
          title: 'Compliance Reporting',
          content: 'Use audit logs to generate compliance reports for SOC 2, HIPAA, or other frameworks. Schedule monthly exports and review them for anomalies. Create alerts for sensitive events like admin permission changes or failed login attempts.'
        },
        {
          id: 'ce7-7',
          type: 'text',
          title: 'Data Retention',
          content: `<p>Audit log retention policies:</p>
<ul>
  <li><strong>Default retention</strong> - 90 days of logs stored in console</li>
  <li><strong>Extended retention</strong> - Available for compliance needs (up to 7 years)</li>
  <li><strong>Export for long-term</strong> - Export to your own storage for indefinite retention</li>
  <li><strong>Conversation logs</strong> - Separate from audit logs, governed by data policy</li>
</ul>`
        },
        {
          id: 'ce7-8',
          type: 'warning',
          title: 'Log Integrity',
          content: 'Audit logs are immutable and cannot be modified or deleted by admins. This ensures integrity for compliance purposes. If you need to demonstrate log integrity for auditors, contact Anthropic support for attestation documentation.'
        }
      ]
    } as LevelContent
  },

  // Level 8: Advanced Administration
  {
    levelNumber: 8,
    title: 'Advanced Administration',
    description: 'Configure policies, custom deployments, and advanced enterprise settings',
    xpReward: 300,
    estimatedMinutes: 30,
    isFree: false,
    requiresVerification: false,
    content: {
      type: 'lesson',
      sections: [
        {
          id: 'ce8-1',
          type: 'text',
          title: 'Usage Policies',
          content: `<p>Configure organization-wide policies to govern Claude usage:</p>
<ul>
  <li><strong>Content policies</strong> - Restrict certain topics or use cases</li>
  <li><strong>Data handling</strong> - Control conversation retention and export</li>
  <li><strong>Rate limits</strong> - Set usage caps per user or group</li>
  <li><strong>Feature access</strong> - Enable or disable specific capabilities</li>
</ul>`
        },
        {
          id: 'ce8-2',
          type: 'code',
          title: 'Policy Configuration',
          language: 'json',
          content: `{
  "usage_policies": {
    "conversation_retention": {
      "enabled": true,
      "retention_days": 30,
      "user_can_delete": true
    },
    "export_controls": {
      "allow_conversation_export": false,
      "allow_api_key_creation": true,
      "require_approval_for_api": false
    },
    "rate_limits": {
      "messages_per_day": 500,
      "tokens_per_month": 10000000
    },
    "feature_access": {
      "projects": true,
      "artifacts": true,
      "file_upload": true,
      "code_execution": false
    }
  }
}`
        },
        {
          id: 'ce8-3',
          type: 'text',
          title: 'Custom System Prompts',
          content: `<p>Enterprise admins can configure organization-wide system prompts:</p>
<ul>
  <li><strong>Brand guidelines</strong> - Ensure Claude responses align with company voice</li>
  <li><strong>Compliance reminders</strong> - Add disclaimers or warnings to responses</li>
  <li><strong>Context injection</strong> - Provide company-specific knowledge</li>
  <li><strong>Behavior modifications</strong> - Adjust Claude's default behaviors</li>
</ul>`
        },
        {
          id: 'ce8-4',
          type: 'code',
          title: 'System Prompt Configuration',
          language: 'text',
          content: `# Organization System Prompt (Admin Console > Settings > System Prompt)

You are Claude, an AI assistant deployed for Acme Corporation.

Guidelines:
- Always remind users that advice should be verified by appropriate experts
- Do not provide legal, medical, or financial advice
- Refer users to internal resources at docs.acme.com when relevant
- Maintain professional tone consistent with Acme brand voice
- If asked about competitors, remain neutral and factual

Note: This appears in all conversations for all users.`
        },
        {
          id: 'ce8-5',
          type: 'text',
          title: 'Domain Restrictions',
          content: `<p>Control access based on email domains and network locations:</p>
<ul>
  <li><strong>Allowed domains</strong> - Only users with specific email domains can access</li>
  <li><strong>IP allowlisting</strong> - Restrict access to corporate network IPs</li>
  <li><strong>Device requirements</strong> - Enforce managed device policies</li>
  <li><strong>Geographic restrictions</strong> - Limit access by country or region</li>
</ul>`
        },
        {
          id: 'ce8-6',
          type: 'tip',
          title: 'Staged Rollout',
          content: 'For large organizations, use a staged rollout approach. Start with a pilot group, gather feedback, refine policies, then expand to departments incrementally. This allows you to identify issues early and adjust configurations before full deployment.'
        },
        {
          id: 'ce8-7',
          type: 'text',
          title: 'API Management',
          content: `<p>Enterprise API management features:</p>
<ul>
  <li><strong>Key management</strong> - Create, rotate, and revoke API keys</li>
  <li><strong>Usage tracking</strong> - Monitor API consumption per key</li>
  <li><strong>Spending limits</strong> - Set budget caps per key or project</li>
  <li><strong>Model access</strong> - Control which models can be accessed via API</li>
</ul>`
        },
        {
          id: 'ce8-8',
          type: 'code',
          title: 'API Key Policy',
          language: 'json',
          content: `{
  "api_key_policy": {
    "require_admin_approval": true,
    "max_keys_per_user": 3,
    "default_spending_limit": 1000,
    "allowed_models": [
      "claude-3-opus",
      "claude-3-sonnet",
      "claude-3-haiku"
    ],
    "require_key_expiry": true,
    "max_key_lifetime_days": 90,
    "notify_on_creation": true
  }
}`
        },
        {
          id: 'ce8-9',
          type: 'text',
          title: 'Disaster Recovery',
          content: `<p>Enterprise disaster recovery and business continuity:</p>
<ul>
  <li><strong>Data backup</strong> - Regular backups of organization settings</li>
  <li><strong>Config export</strong> - Export all configurations for recovery</li>
  <li><strong>Redundancy</strong> - Multi-region deployment for availability</li>
  <li><strong>Incident response</strong> - Defined procedures with Anthropic support</li>
</ul>`
        },
        {
          id: 'ce8-10',
          type: 'warning',
          title: 'Policy Testing',
          content: 'Always test policy changes with a small group before applying organization-wide. Some policies (like SSO enforcement or IP restrictions) can lock out users if misconfigured. Have a rollback plan ready before making significant changes.'
        },
        {
          id: 'ce8-11',
          type: 'text',
          title: 'Enterprise Support',
          content: `<p>Enterprise customers have access to dedicated support:</p>
<ul>
  <li><strong>Account manager</strong> - Your primary contact for business needs</li>
  <li><strong>Technical support</strong> - Priority access to engineering assistance</li>
  <li><strong>Training resources</strong> - Custom training for your organization</li>
  <li><strong>Roadmap input</strong> - Influence on product direction</li>
  <li><strong>SLA guarantees</strong> - Defined uptime and response commitments</li>
</ul>`
        }
      ]
    } as LevelContent
  }
];
