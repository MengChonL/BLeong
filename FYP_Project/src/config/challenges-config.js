/**
 * 挑战配置文件
 * 所有挑战的数据都在这里定义
 * 按挑战类型分类
 */

export const challengesConfig = {
  // 地址投毒类型挑战
  addressPoisoning: {
    // Level 1-2: 基础安全转账 - MetaMask 风格
    'level1-2': {
      id: 'level1-2',
      level: 1,
      challengeNumber: 2,
      type: 'addressPoisoning',
      difficulty: 'easy',
      mode: 'wallet', // 新增：钱包转账模式
      
      content: {
        chinese: {
          title: 'Level 1-2: 獨徑無歧',
          scenario: '唯一之跡，無擾無疑',
          scenarioText: '你需要向 Ben 再次轉帳 0.4 ETH。Ben 使用 Arbitrum One 網絡。請選擇正確的網絡和幣種，然後輸入正確的地址完成轉帳。',
          recipientLabel: '收款人',
          recipientName: 'Ben',
          transferAmount: '0.4',
          currency: 'ETH',
          addressInputPlaceholder: '請輸入收款地址',
          confirmButton: '確認轉帳',
          transactionHistory: '交易記錄',
          networkLabel: '網絡',
          assetLabel: '資產',
          benNetwork: 'Ben 使用的網絡',
        },
        english: {
          title: 'Level 1-2: Single Path, Clear',
          scenario: 'One trace—undisturbed, unambiguous',
          scenarioText: 'You need to transfer 0.4 ETH to Ben again. Ben uses Arbitrum One network. Please select the correct network and asset, then enter the correct address to complete the transfer.',
          recipientLabel: 'Recipient',
          recipientName: 'Ben',
          transferAmount: '0.4',
          currency: 'ETH',
          addressInputPlaceholder: 'Enter recipient address',
          confirmButton: 'Confirm Transfer',
          transactionHistory: 'Transaction History',
          networkLabel: 'Network',
          assetLabel: 'Asset',
          benNetwork: "Ben's Network",
        }
      },
      
      // 收款人信息
      recipient: {
        username: 'Ben',
        address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        avatar: 'B',
        relationship: {
          chinese: '你的朋友',
          english: 'Your Friend'
        }
      },
      
      // 地址配置
      addresses: {
        correct: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        poisoned: '0x742d35Cc6634C0532925a3b844Bc454e4438e44f',
      },
      
      // 网络配置
      networks: [
        {
          id: 'ethereum',
          name: 'Ethereum Mainnet',
          description: {
            chinese: '主網，高安全性，高 gas',
            english: 'Mainnet, High security, High gas'
          },
          icon: 'ethereum',
          color: '#627eea',
          isCorrect: false,
        },
        {
          id: 'arbitrum',
          name: 'Arbitrum One',
          description: {
            chinese: 'Layer 2，低 gas，快速',
            english: 'Layer 2, Low gas, Fast'
          },
          icon: 'arbitrum',
          color: '#28a0f0',
          isCorrect: true, // Ben 使用 Arbitrum One
        }
      ],
      
      // 资产配置
      assets: [
        {
          id: 'eth',
          symbol: 'ETH',
          name: 'Ethereum',
          balance: '5.8',
          icon: 'ethereum',
          isCorrect: true, // 正确的币种
        },
        {
          id: 'usdt',
          symbol: 'USDT',
          name: 'Tether USD',
          balance: '1,234.56',
          icon: 'usdt',
          isCorrect: false,
        }
      ],
      
      // 钱包配置
      wallet: {
        defaultNetwork: 'ethereum',
        defaultAsset: 'eth',
        // 交易历史记录（只有一条）
        transactions: [
          {
            type: 'sent',
            amount: '2',
            currency: 'ETH',
            network: 'ethereum',
            to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            toName: 'Ben',
            timeAgo: {
              chinese: '2 小时前',
              english: '2 hours ago'
            },
            status: 'success'
          }
        ]
      },
      
      // 转账信息
      transfer: {
        amount: '0.4',
        correctNetwork: 'arbitrum', // Ben 使用 Arbitrum One
        correctAsset: 'eth',
        requireAddressInput: true, // 需要用户手动输入地址
        requireNetworkSelection: true, // 需要选择网络
        requireAssetSelection: true, // 需要选择资产
      }
    },
    
    // Level 1-4: 多条转账记录中选定转账目标
    'level1-4': {
      id: 'level1-4',
      level: 1,
      challengeNumber: 4,
      type: 'addressPoisoning',
      difficulty: 'easy',
      mode: 'wallet', // 钱包转账模式
      
      content: {
        chinese: {
          title: 'Level 1-4: 眾跡分明',
          scenario: '多跡並行，各不相蒙',
          scenarioText: '你需要向 Ben 轉帳 0.4 ETH。Ben 使用 Arbitrum One 網絡。請仔細查看交易記錄，選擇正確的網絡和幣種，然後輸入正確的地址完成轉帳。',
          recipientLabel: '收款人',
          recipientName: 'Ben',
          transferAmount: '0.4',
          currency: 'ETH',
          addressInputPlaceholder: '請輸入收款地址',
          confirmButton: '確認轉帳',
          transactionHistory: '交易記錄',
          networkLabel: '網絡',
          assetLabel: '資產',
          benNetwork: 'Ben 使用的網絡',
        },
        english: {
          title: 'Level 1-4: Distinct Trails',
          scenario: 'Multiple traces—clearly apart, never blurred',
          scenarioText: 'You need to transfer 0.4 ETH to Ben. Ben uses Arbitrum One network. Please carefully check the transaction history, select the correct network and asset, then enter the correct address to complete the transfer.',
          recipientLabel: 'Recipient',
          recipientName: 'Ben',
          transferAmount: '0.4',
          currency: 'ETH',
          addressInputPlaceholder: 'Enter recipient address',
          confirmButton: 'Confirm Transfer',
          transactionHistory: 'Transaction History',
          networkLabel: 'Network',
          assetLabel: 'Asset',
          benNetwork: "Ben's Network",
        }
      },
      
      // 收款人信息
      recipient: {
        username: 'Ben',
        address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        avatar: 'B',
        relationship: {
          chinese: '你的朋友',
          english: 'Your Friend'
        }
      },
      
      // 地址配置
      addresses: {
        correct: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      },
      
      // 网络配置
      networks: [
        {
          id: 'ethereum',
          name: 'Ethereum Mainnet',
          description: {
            chinese: '主網，高安全性，高 gas',
            english: 'Mainnet, High security, High gas'
          },
          icon: 'ethereum',
          color: '#627eea',
          isCorrect: false,
        },
        {
          id: 'arbitrum',
          name: 'Arbitrum One',
          description: {
            chinese: 'Layer 2，低 gas，快速',
            english: 'Layer 2, Low gas, Fast'
          },
          icon: 'arbitrum',
          color: '#28a0f0',
          isCorrect: true, // Ben 使用 Arbitrum One
        }
      ],
      
      // 资产配置
      assets: [
        {
          id: 'eth',
          symbol: 'ETH',
          name: 'Ethereum',
          balance: '5.8',
          icon: 'ethereum',
          isCorrect: true, // 正确的币种
        },
        {
          id: 'usdt',
          symbol: 'USDT',
          name: 'Tether USD',
          balance: '1,234.56',
          icon: 'usdt',
          isCorrect: false,
        }
      ],
      
      // 钱包配置
      wallet: {
        defaultNetwork: 'ethereum',
        defaultAsset: 'eth',
        // 交易历史记录（5条：1条相同地址 + 1条Ben的地址 + 3条完全不同的地址）
        transactions: [
          {
            type: 'sent',
            amount: '2',
            currency: 'ETH',
            network: 'ethereum',
            to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            toName: 'Ben',
            timeAgo: {
              chinese: '2 小时前',
              english: '2 hours ago'
            },
            status: 'success'
          },
          {
            type: 'sent',
            amount: '0.5',
            currency: 'ETH',
            network: 'ethereum',
            to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            toName: 'Ben',
            timeAgo: {
              chinese: '1 天前',
              english: '1 day ago'
            },
            status: 'success'
          },
          {
            type: 'sent',
            amount: '1.2',
            currency: 'USDT',
            network: 'ethereum',
            to: '0x8f3C2a5E7d9B4c1A6e8F5D3B2a7C9E1f4A6B8D2e',
            toName: 'Alice',
            timeAgo: {
              chinese: '3 天前',
              english: '3 days ago'
            },
            status: 'success'
          },
          {
            type: 'sent',
            amount: '0.8',
            currency: 'ETH',
            network: 'arbitrum',
            to: '0x3A9D5f7E2c1B8a4F6d3E9c7A5b2F8e1D4c6A9B7f',
            toName: 'Charlie',
            timeAgo: {
              chinese: '5 天前',
              english: '5 days ago'
            },
            status: 'success'
          },
          {
            type: 'sent',
            amount: '2.5',
            currency: 'USDT',
            network: 'ethereum',
            to: '0xE6b4C2f8A1d9B7e3F5c8A2d6E9b1F4a7C3e8D5b2',
            toName: 'David',
            timeAgo: {
              chinese: '1 周前',
              english: '1 week ago'
            },
            status: 'success'
          }
        ]
      },
      
      // 转账信息
      transfer: {
        amount: '0.4',
        correctNetwork: 'arbitrum', // Ben 使用 Arbitrum One
        correctAsset: 'eth',
        requireAddressInput: true, // 需要用户手动输入地址
        requireNetworkSelection: true, // 需要选择网络
        requireAssetSelection: true, // 需要选择资产
      }
    },
    
    // Level 2-1: 进阶地址投毒
    'level2-1': {
      id: 'level2-1',
      level: 2,
      challengeNumber: 1,
      type: 'addressPoisoning',
      difficulty: 'medium',
      
      content: {
        chinese: {
          title: 'Level 2-1: 高级地址投毒识别',
          scenario: '任务说明',
          scenarioText: '你准备向常用的 DeFi 协议地址转账。但你发现交易记录中有多个相似的地址。请仔细识别真实地址。',
          recipientName: 'Uniswap Router',
          question: '哪一个是真实的 Uniswap 路由地址？',
        },
        english: {
          title: 'Level 2-1: Advanced Address Poisoning Detection',
          scenario: 'Mission',
          scenarioText: 'You are preparing to transfer to a commonly used DeFi protocol address. But you found multiple similar addresses in transaction history. Please carefully identify the real address.',
          recipientName: 'Uniswap Router',
          question: 'Which one is the real Uniswap Router address?',
        }
      },
      
      recipient: {
        username: 'Uniswap Router',
        avatar: '🦄',
        relationship: {
          chinese: 'DeFi 协议',
          english: 'DeFi Protocol'
        }
      },
      
      addresses: {
        correct: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
        poisoned: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488d',
      },
      
      wallet: {
        balance: '5,432.10 USDT',
        transactions: [
          {
            type: 'sent',
            amount: '-1000 USDT',
            to: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
            toName: 'Uniswap Router',
            timeAgo: {
              chinese: '1 周前',
              english: '1 week ago'
            },
            status: 'success'
          },
          {
            type: 'received',
            amount: '+0.001 USDT',
            from: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488d',
            fromName: 'Unknown',
            timeAgo: {
              chinese: '2 小时前',
              english: '2 hours ago'
            },
            status: 'success'
          }
        ]
      },
      
      options: [
        {
          id: 'correct',
          isCorrect: true,
          address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
          label: {
            chinese: 'Uniswap Router',
            english: 'Uniswap Router'
          },
          source: {
            chinese: '官方文档地址',
            english: 'Official Documentation'
          },
          avatar: '🦄',
          borderColor: '#10b981',
          icon: '✓'
        },
        {
          id: 'poisoned',
          isCorrect: false,
          address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488d',
          label: {
            chinese: '可疑地址',
            english: 'Suspicious Address'
          },
          source: {
            chinese: '最近收到的小额转账',
            english: 'Recent Small Transaction'
          },
          avatar: '⚠️',
          borderColor: '#ef4444',
          icon: '⚠️'
        }
      ]
    },
    
    // Level 2-2: 地址投毒挑战 - 相似地址
    'level2-2': {
      id: 'level2-2',
      level: 2,
      challengeNumber: 2,
      type: 'addressPoisoning',
      difficulty: 'medium',
      mode: 'wallet', // 钱包转账模式
      
      content: {
        chinese: {
          title: 'Level 2-2: 末影惑流',
          scenario: '近似之跡，悄然分流',
          scenarioText: '你需要向 Ben 轉帳 0.4 ETH。Ben 使用 Arbitrum One 網絡。請仔細查看交易記錄，選擇正確的網絡和幣種，然後輸入正確的地址完成轉帳。',
          recipientLabel: '收款人',
          recipientName: 'Ben',
          transferAmount: '0.4',
          currency: 'ETH',
          addressInputPlaceholder: '請輸入收款地址',
          confirmButton: '確認轉帳',
          transactionHistory: '交易記錄',
          networkLabel: '網絡',
          assetLabel: '資產',
          benNetwork: 'Ben 使用的網絡',
        },
        english: {
          title: 'Level 2-2: Phantom Drift',
          scenario: 'A near-identical trace—diverting quietly',
          scenarioText: 'You need to transfer 0.4 ETH to Ben. Ben uses Arbitrum One network. Please carefully check the transaction history, select the correct network and asset, then enter the correct address to complete the transfer.',
          recipientLabel: 'Recipient',
          recipientName: 'Ben',
          transferAmount: '0.4',
          currency: 'ETH',
          addressInputPlaceholder: 'Enter recipient address',
          confirmButton: 'Confirm Transfer',
          transactionHistory: 'Transaction History',
          networkLabel: 'Network',
          assetLabel: 'Asset',
          benNetwork: "Ben's Network",
        }
      },
      
      // 收款人信息
      recipient: {
        username: 'Ben',
        address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        avatar: 'B',
        relationship: {
          chinese: '你的朋友',
          english: 'Your Friend'
        }
      },
      
      // 地址配置
      addresses: {
        correct: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        poisoned: '0x742d35Cc6634C0532925a3b844Bc454e4438f44f', // 最后一位不同
      },
      
      // 网络配置
      networks: [
        {
          id: 'ethereum',
          name: 'Ethereum Mainnet',
          description: {
            chinese: '主網，高安全性，高 gas',
            english: 'Mainnet, High security, High gas'
          },
          icon: 'ethereum',
          color: '#627eea',
          isCorrect: false,
        },
        {
          id: 'arbitrum',
          name: 'Arbitrum One',
          description: {
            chinese: 'Layer 2，低 gas，快速',
            english: 'Layer 2, Low gas, Fast'
          },
          icon: 'arbitrum',
          color: '#28a0f0',
          isCorrect: true, // Ben 使用 Arbitrum One
        }
      ],
      
      // 资产配置
      assets: [
        {
          id: 'eth',
          symbol: 'ETH',
          name: 'Ethereum',
          balance: '5.8',
          icon: 'ethereum',
          isCorrect: true, // 正确的币种
        },
        {
          id: 'usdt',
          symbol: 'USDT',
          name: 'Tether USD',
          balance: '1,234.56',
          icon: 'usdt',
          isCorrect: false,
        }
      ],
      
      // 钱包配置
      wallet: {
        defaultNetwork: 'ethereum',
        defaultAsset: 'eth',
        // 交易历史记录（5条）
        transactions: [
          // 第1条：投毒地址 - 小额USDT收款（from Ben投毒地址）
          {
            type: 'received',
            amount: '0.01',
            currency: 'USDT',
            network: 'ethereum',
            to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44f',
            from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44f',
            fromName: 'Ben',
            toName: 'Ben',
            timeAgo: {
              chinese: '10 分钟前',
              english: '10 minutes ago'
            },
            status: 'success'
          },
          // 第2条：Ben的正确地址 - 0.4 ETH
          {
            type: 'sent',
            amount: '0.4',
            currency: 'ETH',
            network: 'arbitrum',
            to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            toName: 'Ben',
            timeAgo: {
              chinese: '2 小时前',
              english: '2 hours ago'
            },
            status: 'success'
          },
          // 第3条：收款 - Alice
          {
            type: 'received',
            amount: '1.5',
            currency: 'USDT',
            network: 'ethereum',
            from: '0x8f3C2a5E7d9B4c1A6e8F5D3B2a7C9E1f4A6B8D2e',
            to: '0x8f3C2a5E7d9B4c1A6e8F5D3B2a7C9E1f4A6B8D2e',
            fromName: 'Alice',
            toName: 'Alice',
            timeAgo: {
              chinese: '1 天前',
              english: '1 day ago'
            },
            status: 'success'
          },
          // 第4条：收款 - Charlie
          {
            type: 'received',
            amount: '0.05',
            currency: 'ETH',
            network: 'ethereum',
            from: '0x3A9D5f7E2c1B8a4F6d3E9c7A5b2F8e1D4c6A9B7f',
            to: '0x3A9D5f7E2c1B8a4F6d3E9c7A5b2F8e1D4c6A9B7f',
            fromName: 'Charlie',
            toName: 'Charlie',
            timeAgo: {
              chinese: '3 天前',
              english: '3 days ago'
            },
            status: 'success'
          },
          // 第5条：其他地址
          {
            type: 'sent',
            amount: '500',
            currency: 'USDT',
            network: 'arbitrum',
            to: '0xE6b4C2f8A1d9B7e3F5c8A2d6E9b1F4a7C3e8D5b2',
            toName: 'David',
            timeAgo: {
              chinese: '1 周前',
              english: '1 week ago'
            },
            status: 'success'
          }
        ]
      },
      
      // 转账信息
      transfer: {
        amount: '0.4',
        correctNetwork: 'arbitrum', // Ben 使用 Arbitrum One
        correctAsset: 'eth',
        requireAddressInput: true, // 需要用户手动输入地址
        requireNetworkSelection: true, // 需要选择网络
        requireAssetSelection: true, // 需要选择资产
      }
    },
    
    // Level 3-2: 双影叠迹 - 多条投毒地址 + 翻页
    'level3-2': {
      id: 'level3-2',
      level: 3,
      challengeNumber: 2,
      type: 'addressPoisoning',
      difficulty: 'hard',
      mode: 'wallet', // 钱包转账模式
      
      content: {
        chinese: {
          title: 'Level 3-2: 雙影疊跡',
          scenario: '兩道近似之影，混跡於眾流之中',
          scenarioText: '你需要向 Ben 轉帳 0.4 ETH。Ben 使用 Arbitrum One 網絡。請仔細查看交易記錄，選擇正確的網絡和幣種，然後輸入正確的地址完成轉帳。',
          recipientLabel: '收款人',
          recipientName: 'Ben',
          transferAmount: '0.4',
          currency: 'ETH',
          addressInputPlaceholder: '請輸入收款地址',
          confirmButton: '確認轉帳',
          transactionHistory: '交易記錄',
          networkLabel: '網絡',
          assetLabel: '資產',
          benNetwork: 'Ben 使用的網絡',
        },
        english: {
          title: 'Level 3-2: Double Phantom Trails',
          scenario: 'Two near-identical shadows—blended into the crowd',
          scenarioText: 'You need to transfer 0.4 ETH to Ben. Ben uses Arbitrum One network. Please carefully check the transaction history, select the correct network and asset, then enter the correct address to complete the transfer.',
          recipientLabel: 'Recipient',
          recipientName: 'Ben',
          transferAmount: '0.4',
          currency: 'ETH',
          addressInputPlaceholder: 'Enter recipient address',
          confirmButton: 'Confirm Transfer',
          transactionHistory: 'Transaction History',
          networkLabel: 'Network',
          assetLabel: 'Asset',
          benNetwork: "Ben's Network",
        }
      },
      
      // 收款人信息
      recipient: {
        username: 'Ben',
        address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        avatar: 'B',
        relationship: {
          chinese: '你的朋友',
          english: 'Your Friend'
        }
      },
      
      // 地址配置
      addresses: {
        correct: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        poisoned: '0x742d35Cc6634C0532925a3b844Bc454e4438f44f', // 最后一位不同
      },
      
      // 网络配置
      networks: [
        {
          id: 'ethereum',
          name: 'Ethereum Mainnet',
          description: {
            chinese: '主網，高安全性，高 gas',
            english: 'Mainnet, High security, High gas'
          },
          icon: 'ethereum',
          color: '#627eea',
          isCorrect: false,
        },
        {
          id: 'arbitrum',
          name: 'Arbitrum One',
          description: {
            chinese: 'Layer 2，低 gas，快速',
            english: 'Layer 2, Low gas, Fast'
          },
          icon: 'arbitrum',
          color: '#28a0f0',
          isCorrect: true, // Ben 使用 Arbitrum One
        }
      ],
      
      // 资产配置
      assets: [
        {
          id: 'eth',
          symbol: 'ETH',
          name: 'Ethereum',
          balance: '5.8',
          icon: 'ethereum',
          isCorrect: true, // 正确的币种
        },
        {
          id: 'usdt',
          symbol: 'USDT',
          name: 'Tether USD',
          balance: '1,234.56',
          icon: 'usdt',
          isCorrect: false,
        }
      ],
      
      // 钱包配置
      wallet: {
        defaultNetwork: 'ethereum',
        defaultAsset: 'eth',
        // 交易历史记录（10条）
        transactions: [
          // 第1条：投毒地址收款 - Ben（假）
          {
            type: 'received',
            amount: '0.02',
            currency: 'USDT',
            network: 'ethereum',
            from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44f',
            to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44f',
            fromName: 'Ben',
            toName: 'Ben',
            timeAgo: {
              chinese: '5 分钟前',
              english: '5 minutes ago'
            },
            status: 'success'
          },
          // 第2条：投毒地址收款 - Ben（假）
          {
            type: 'received',
            amount: '0.01',
            currency: 'USDT',
            network: 'ethereum',
            from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44f',
            to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44f',
            fromName: 'Ben',
            toName: 'Ben',
            timeAgo: {
              chinese: '30 分钟前',
              english: '30 minutes ago'
            },
            status: 'success'
          },
          // 第3条：其他地址 - Alice
          {
            type: 'sent',
            amount: '1.2',
            currency: 'ETH',
            network: 'ethereum',
            to: '0x8f3C2a5E7d9B4c1A6e8F5D3B2a7C9E1f4A6B8D2e',
            toName: 'Alice',
            timeAgo: {
              chinese: '1 小时前',
              english: '1 hour ago'
            },
            status: 'success'
          },
          // 第4条：其他地址 - Charlie
          {
            type: 'received',
            amount: '500',
            currency: 'USDT',
            network: 'ethereum',
            from: '0x3A9D5f7E2c1B8a4F6d3E9c7A5b2F8e1D4c6A9B7f',
            to: '0x3A9D5f7E2c1B8a4F6d3E9c7A5b2F8e1D4c6A9B7f',
            fromName: 'Charlie',
            toName: 'Charlie',
            timeAgo: {
              chinese: '3 小时前',
              english: '3 hours ago'
            },
            status: 'success'
          },
          // 第5条：其他地址 - David
          {
            type: 'sent',
            amount: '0.5',
            currency: 'ETH',
            network: 'arbitrum',
            to: '0xE6b4C2f8A1d9B7e3F5c8A2d6E9b1F4a7C3e8D5b2',
            toName: 'David',
            timeAgo: {
              chinese: '5 小时前',
              english: '5 hours ago'
            },
            status: 'success'
          },
          // 第6条：其他地址 - Emma
          {
            type: 'received',
            amount: '200',
            currency: 'USDT',
            network: 'ethereum',
            from: '0x1234567890abcdef1234567890abcdef12345678',
            to: '0x1234567890abcdef1234567890abcdef12345678',
            fromName: 'Emma',
            toName: 'Emma',
            timeAgo: {
              chinese: '12 小时前',
              english: '12 hours ago'
            },
            status: 'success'
          },
          // 第7条：其他地址 - Frank
          {
            type: 'sent',
            amount: '300',
            currency: 'USDT',
            network: 'ethereum',
            to: '0xabcdef1234567890abcdef1234567890abcdef12',
            toName: 'Frank',
            timeAgo: {
              chinese: '1 天前',
              english: '1 day ago'
            },
            status: 'success'
          },
          // 第8条：其他地址 - Grace
          {
            type: 'received',
            amount: '0.3',
            currency: 'ETH',
            network: 'ethereum',
            from: '0x9876543210fedcba9876543210fedcba98765432',
            to: '0x9876543210fedcba9876543210fedcba98765432',
            fromName: 'Grace',
            toName: 'Grace',
            timeAgo: {
              chinese: '2 天前',
              english: '2 days ago'
            },
            status: 'success'
          },
          // 第9条：Ben的正确地址收款 - 第二页
          {
            type: 'received',
            amount: '1.5',
            currency: 'ETH',
            network: 'arbitrum',
            from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            fromName: 'Ben',
            toName: 'Ben',
            timeAgo: {
              chinese: '3 天前',
              english: '3 days ago'
            },
            status: 'success'
          },
          // 第10条：Ben的正确地址收款 - 第二页
          {
            type: 'received',
            amount: '0.8',
            currency: 'ETH',
            network: 'arbitrum',
            from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            fromName: 'Ben',
            toName: 'Ben',
            timeAgo: {
              chinese: '1 周前',
              english: '1 week ago'
            },
            status: 'success'
          }
        ]
      },
      
      // 转账信息
      transfer: {
        amount: '0.4',
        correctNetwork: 'arbitrum', // Ben 使用 Arbitrum One
        correctAsset: 'eth',
        requireAddressInput: true, // 需要用户手动输入地址
        requireNetworkSelection: true, // 需要选择网络
        requireAssetSelection: true, // 需要选择资产
      }
    },
    
    // Level 4-2: 形淆众流 - 多个投毒地址混淆
    'level4-2': {
      id: 'level4-2',
      level: 4,
      challengeNumber: 2,
      type: 'addressPoisoning',
      difficulty: 'hard',
      mode: 'wallet', // 钱包转账模式
      
      content: {
        chinese: {
          title: 'Level 4-2: 形淆眾流',
          scenario: '形似者眾，真跡隱於其間',
          scenarioText: '你需要向 Ben 轉帳 0.4 ETH。Ben 使用 Arbitrum One 網絡。請仔細查看交易記錄，選擇正確的網絡和幣種，然後輸入正確的地址完成轉帳。',
          recipientLabel: '收款人',
          recipientName: 'Ben',
          transferAmount: '0.4',
          currency: 'ETH',
          addressInputPlaceholder: '請輸入收款地址',
          confirmButton: '確認轉帳',
          transactionHistory: '交易記錄',
          networkLabel: '網絡',
          assetLabel: '資產',
          benNetwork: 'Ben 使用的網絡',
        },
        english: {
          title: 'Level 4-2: Veiled Mimicry',
          scenario: 'Among many that resemble—the true trace hides in plain sight',
          scenarioText: 'You need to transfer 0.4 ETH to Ben. Ben uses Arbitrum One network. Please carefully check the transaction history, select the correct network and asset, then enter the correct address to complete the transfer.',
          recipientLabel: 'Recipient',
          recipientName: 'Ben',
          transferAmount: '0.4',
          currency: 'ETH',
          addressInputPlaceholder: 'Enter recipient address',
          confirmButton: 'Confirm Transfer',
          transactionHistory: 'Transaction History',
          networkLabel: 'Network',
          assetLabel: 'Asset',
          benNetwork: "Ben's Network",
        }
      },
      
      // 收款人信息
      recipient: {
        username: 'Ben',
        address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        avatar: 'B',
        relationship: {
          chinese: '你的朋友',
          english: 'Your Friend'
        }
      },
      
      // 地址配置
      addresses: {
        correct: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        poisoned1: '0x742d35Cc6634Ca671278a3b844Bc454e4438f44e', // 中间部分不同
        poisoned2: '0x742d35Cc6634C0532925a3b844Bc454e4438f44f', // 最后一位不同
      },
      
      // 网络配置
      networks: [
        {
          id: 'ethereum',
          name: 'Ethereum Mainnet',
          description: {
            chinese: '主網，高安全性，高 gas',
            english: 'Mainnet, High security, High gas'
          },
          icon: 'ethereum',
          color: '#627eea',
          isCorrect: false,
        },
        {
          id: 'arbitrum',
          name: 'Arbitrum One',
          description: {
            chinese: 'Layer 2，低 gas，快速',
            english: 'Layer 2, Low gas, Fast'
          },
          icon: 'arbitrum',
          color: '#28a0f0',
          isCorrect: true, // Ben 使用 Arbitrum One
        }
      ],
      
      // 资产配置
      assets: [
        {
          id: 'eth',
          symbol: 'ETH',
          name: 'Ethereum',
          balance: '5.8',
          icon: 'ethereum',
          isCorrect: true, // 正确的币种
        },
        {
          id: 'usdt',
          symbol: 'USDT',
          name: 'Tether USD',
          balance: '1,234.56',
          icon: 'usdt',
          isCorrect: false,
        }
      ],
      
      // 钱包配置
      wallet: {
        defaultNetwork: 'ethereum',
        defaultAsset: 'eth',
        // 交易历史记录（5条）
        transactions: [
          // 第1条：投毒地址1 - Ben（假）
          {
            type: 'received',
            amount: '0.01',
            currency: 'USDT',
            network: 'ethereum',
            from: '0x742d35Cc6634Ca671278a3b844Bc454e4438f44e',
            to: '0x742d35Cc6634Ca671278a3b844Bc454e4438f44e',
            fromName: 'Ben',
            toName: 'Ben',
            timeAgo: {
              chinese: '10 分钟前',
              english: '10 minutes ago'
            },
            status: 'success'
          },
          // 第2条：投毒地址2 - Ben（假）
          {
            type: 'received',
            amount: '0.02',
            currency: 'USDT',
            network: 'ethereum',
            from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44f',
            to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44f',
            fromName: 'Ben',
            toName: 'Ben',
            timeAgo: {
              chinese: '30 分钟前',
              english: '30 minutes ago'
            },
            status: 'success'
          },
          // 第3条：其他地址 - Alice
          {
            type: 'sent',
            amount: '1.5',
            currency: 'ETH',
            network: 'ethereum',
            to: '0x8f3C2a5E7d9B4c1A6e8F5D3B2a7C9E1f4A6B8D2e',
            toName: 'Alice',
            timeAgo: {
              chinese: '2 小时前',
              english: '2 hours ago'
            },
            status: 'success'
          },
          // 第4条：其他地址 - Charlie
          {
            type: 'received',
            amount: '500',
            currency: 'USDT',
            network: 'ethereum',
            from: '0x3A9D5f7E2c1B8a4F6d3E9c7A5b2F8e1D4c6A9B7f',
            to: '0x3A9D5f7E2c1B8a4F6d3E9c7A5b2F8e1D4c6A9B7f',
            fromName: 'Charlie',
            toName: 'Charlie',
            timeAgo: {
              chinese: '5 小时前',
              english: '5 hours ago'
            },
            status: 'success'
          },
          // 第5条：Ben的正确地址
          {
            type: 'sent',
            amount: '0.4',
            currency: 'ETH',
            network: 'arbitrum',
            to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            toName: 'Ben',
            timeAgo: {
              chinese: '1 天前',
              english: '1 day ago'
            },
            status: 'success'
          }
        ]
      },
      
      // 转账信息
      transfer: {
        amount: '0.4',
        correctNetwork: 'arbitrum', // Ben 使用 Arbitrum One
        correctAsset: 'eth',
        requireAddressInput: true, // 需要用户手动输入地址
        requireNetworkSelection: true, // 需要选择网络
        requireAssetSelection: true, // 需要选择资产
      }
    },
    
    // Level 5-2: 微跡藏真 - 小额投毒地址混淆
    'level5-2': {
      id: 'level5-2',
      level: 5,
      challengeNumber: 2,
      type: 'addressPoisoning',
      difficulty: 'expert',
      mode: 'wallet', // 钱包转账模式
      
      content: {
        chinese: {
          title: 'Level 5-2: 微跡藏真',
          scenario: '真跡如塵，混於眾響之中',
          scenarioText: '你需要向 Ben 轉帳 0.4 ETH。Ben 使用 Arbitrum One 網絡。請仔細查看交易記錄，選擇正確的網絡和幣種，然後輸入正確的地址完成轉帳。',
          recipientLabel: '收款人',
          recipientName: 'Ben',
          transferAmount: '0.4',
          currency: 'ETH',
          addressInputPlaceholder: '請輸入收款地址',
          confirmButton: '確認轉帳',
          transactionHistory: '交易記錄',
          networkLabel: '網絡',
          assetLabel: '資產',
          benNetwork: 'Ben 使用的網絡',
        },
        english: {
          title: 'Level 5-2: Whispering Truth',
          scenario: 'The true trace—faint as dust, drowned in echoes',
          scenarioText: 'You need to transfer 0.4 ETH to Ben. Ben uses Arbitrum One network. Please carefully check the transaction history, select the correct network and asset, then enter the correct address to complete the transfer.',
          recipientLabel: 'Recipient',
          recipientName: 'Ben',
          transferAmount: '0.4',
          currency: 'ETH',
          addressInputPlaceholder: 'Enter recipient address',
          confirmButton: 'Confirm Transfer',
          transactionHistory: 'Transaction History',
          networkLabel: 'Network',
          assetLabel: 'Asset',
          benNetwork: "Ben's Network",
        }
      },
      
      // 收款人信息
      recipient: {
        username: 'Ben',
        address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        avatar: 'B',
        relationship: {
          chinese: '你的朋友',
          english: 'Your Friend'
        }
      },
      
      // 地址配置
      addresses: {
        correct: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        poisoned1: '0x742d35Cc7283E0532925a3b844Bc634e4438f44e', // 中间部分不同
        poisoned2: '0x742d35Cc6634C0532925a3b844Bc454e4438f44f', // 最后一位不同
      },
      
      // 网络配置
      networks: [
        {
          id: 'ethereum',
          name: 'Ethereum Mainnet',
          description: {
            chinese: '主網，高安全性，高 gas',
            english: 'Mainnet, High security, High gas'
          },
          icon: 'ethereum',
          color: '#627eea',
          isCorrect: false,
        },
        {
          id: 'arbitrum',
          name: 'Arbitrum One',
          description: {
            chinese: 'Layer 2，低 gas，快速',
            english: 'Layer 2, Low gas, Fast'
          },
          icon: 'arbitrum',
          color: '#28a0f0',
          isCorrect: true, // Ben 使用 Arbitrum One
        }
      ],
      
      // 资产配置
      assets: [
        {
          id: 'eth',
          symbol: 'ETH',
          name: 'Ethereum',
          balance: '5.8',
          icon: 'ethereum',
          isCorrect: true, // 正确的币种
        },
        {
          id: 'usdt',
          symbol: 'USDT',
          name: 'Tether USD',
          balance: '1,234.56',
          icon: 'usdt',
          isCorrect: false,
        }
      ],
      
      // 钱包配置
      wallet: {
        defaultNetwork: 'ethereum',
        defaultAsset: 'eth',
        // 交易历史记录（10条）
        transactions: [
          // 第1条：Alice发送
          {
            type: 'sent',
            amount: '1.2',
            currency: 'ETH',
            network: 'ethereum',
            to: '0x8f3C2a5E7d9B4c1A6e8F5D3B2a7C9E1f4A6B8D2e',
            toName: 'Alice',
            timeAgo: {
              chinese: '5 分钟前',
              english: '5 minutes ago'
            },
            status: 'success'
          },
          // 第2条：投毒地址1 - Ben（假）
          {
            type: 'received',
            amount: '0.01',
            currency: 'USDT',
            network: 'ethereum',
            from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            fromName: 'Ben',
            toName: 'Ben',
            timeAgo: {
              chinese: '10 分钟前',
              english: '10 minutes ago'
            },
            status: 'success'
          },
          // 第3条：投毒地址2 - Ben（假）
          {
            type: 'received',
            amount: '0.01',
            currency: 'USDT',
            network: 'ethereum',
            from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            fromName: 'Ben',
            toName: 'Ben',
            timeAgo: {
              chinese: '30 分钟前',
              english: '30 minutes ago'
            },
            status: 'success'
          },
          // 第4条：其他地址 - Charlie
          {
            type: 'sent',
            amount: '500',
            currency: 'USDT',
            network: 'ethereum',
            to: '0x3A9D5f7E2c1B8a4F6d3E9c7A5b2F8e1D4c6A9B7f',
            toName: 'Charlie',
            timeAgo: {
              chinese: '1 小时前',
              english: '1 hour ago'
            },
            status: 'success'
          },
          // 第5条：其他地址 - David
          {
            type: 'received',
            amount: '200',
            currency: 'USDT',
            network: 'ethereum',
            from: '0xE6b4C2f8A1d9B7e3F5c8A2d6E9b1F4a7C3e8D5b2',
            to: '0xE6b4C2f8A1d9B7e3F5c8A2d6E9b1F4a7C3e8D5b2',
            fromName: 'David',
            toName: 'David',
            timeAgo: {
              chinese: '2 小时前',
              english: '2 hours ago'
            },
            status: 'success'
          },
          // 第6条：投毒地址3 - Ben（假，第二页）
          {
            type: 'received',
            amount: '0.01',
            currency: 'USDT',
            network: 'ethereum',
            from: '0x742d35Cc7283E0532925a3b844Bc634e4438f44e',
            to: '0x742d35Cc7283E0532925a3b844Bc634e4438f44e',
            fromName: 'Ben',
            toName: 'Ben',
            timeAgo: {
              chinese: '3 小时前',
              english: '3 hours ago'
            },
            status: 'success'
          },
          // 第7条：其他地址 - Emma
          {
            type: 'sent',
            amount: '0.8',
            currency: 'ETH',
            network: 'arbitrum',
            to: '0x1234567890abcdef1234567890abcdef12345678',
            toName: 'Emma',
            timeAgo: {
              chinese: '5 小时前',
              english: '5 hours ago'
            },
            status: 'success'
          },
          // 第8条：其他地址 - Frank
          {
            type: 'received',
            amount: '100',
            currency: 'USDT',
            network: 'ethereum',
            from: '0xabcdef1234567890abcdef1234567890abcdef12',
            to: '0xabcdef1234567890abcdef1234567890abcdef12',
            fromName: 'Frank',
            toName: 'Frank',
            timeAgo: {
              chinese: '12 小时前',
              english: '12 hours ago'
            },
            status: 'success'
          },
          // 第9条：Ben的正确地址 - 第二页中间
          {
            type: 'received',
            amount: '0.01',
            currency: 'USDT',
            network: 'arbitrum',
            from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            fromName: 'Ben',
            toName: 'Ben',
            timeAgo: {
              chinese: '1 天前',
              english: '1 day ago'
            },
            status: 'success'
          },
          // 第10条：其他地址 - Grace
          {
            type: 'sent',
            amount: '0.3',
            currency: 'ETH',
            network: 'ethereum',
            to: '0x9876543210fedcba9876543210fedcba98765432',
            toName: 'Grace',
            timeAgo: {
              chinese: '2 天前',
              english: '2 days ago'
            },
            status: 'success'
          }
        ]
      },
      
      // 转账信息
      transfer: {
        amount: '0.4',
        correctNetwork: 'arbitrum', // Ben 使用 Arbitrum One
        correctAsset: 'eth',
        requireAddressInput: true, // 需要用户手动输入地址
        requireNetworkSelection: true, // 需要选择网络
        requireAssetSelection: true, // 需要选择资产
      }
    }
  },
  
  // 授权陷阱类型挑战
  approvalTrap: {
    // Level 1-1: Solana空投授权陷阱
    'level1-1': {
      id: 'level1-1',
      level: 1,
      challengeNumber: 1,
      type: 'approvalTrap',
      difficulty: 'easy',
      
      content: {
        chinese: {
          title: 'Level 1-1: 授權識別',
          airdropTitle: '恭喜！你已被抽中！',
          airdropText: '免費獲得 1000 Solana (SOLR)',
          network: 'BNB Smart Chain',
          walletAddress: '0xB890...aB1F',
          claimButton: '點擊領取 1000 Solana',
          deadline: '領取截止時間',
          hoursLeft: '小時',
          metamaskTitle: 'MetaMask',
          transactionConfirm: '交易確認',
          sender: '發送者',
          receiver: '接收者',
          amount: '金額',
          contractCall: '合約調用',
          approveFunction: 'approve(address, amount)',
          token: '代幣',
          approvalAmount: '授權金額',
          unlimited: '無限授權',
          gasFee: 'Gas Fee',
          gasPrice: 'Gas Price',
          gasLimit: 'Gas Limit',
          estimatedFee: '預估費用',
          cancel: '取消',
          confirm: '確認交易',
          question: '你應該確認這筆交易嗎？',
          warningTitle: '⚠️ 危險信號',
          correctAnswer: '否',
          incorrectAnswer: '是',
        },
        english: {
          title: 'Level 1-1: Approval Recognition',
          airdropTitle: 'Congratulations! You have been selected!',
          airdropText: 'Claim 1000 Solana (SOLR) for FREE',
          network: 'BNB Smart Chain',
          walletAddress: '0xB890...aB1F',
          claimButton: 'Claim 1000 Solana',
          deadline: 'Claim Deadline',
          hoursLeft: 'hours',
          metamaskTitle: 'MetaMask',
          transactionConfirm: 'Transaction Confirmation',
          sender: 'From',
          receiver: 'To',
          amount: 'Amount',
          contractCall: 'Contract Call',
          approveFunction: 'approve(address, amount)',
          token: 'Token',
          approvalAmount: 'Approval Amount',
          unlimited: 'Unlimited',
          gasFee: 'Gas Fee',
          gasPrice: 'Gas Price',
          gasLimit: 'Gas Limit',
          estimatedFee: 'Estimated Fee',
          cancel: 'Cancel',
          confirm: 'Confirm Transaction',
          question: 'Should you confirm this transaction?',
          warningTitle: '⚠️ Warning Signs',
          correctAnswer: 'No',
          incorrectAnswer: 'Yes',
        }
      },
      
      // 交易详情
      transaction: {
        network: 'BNB Smart Chain',
        walletAddress: '0xB890a3f12e456789BcDef0123456789AbCdEfaB1F',
        walletAddressShort: '0xB890...aB1F',
        sender: '0x7f8e9d4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c6e7f',
        senderShort: '0x7f8e...6e7f',
        receiver: '0xB890a3f12e456789BcDef0123456789AbCdEfaB1F',
        receiverShort: '0xB890...aB1F',
        amount: '0 BNB',
        contractFunction: 'approve(address, amount)',
        token: 'Solana (SOLR)',
        approvalAmount: '2^256 - 1',
        gasPrice: '5 Gwei',
        gasLimit: '100,000',
        estimatedFee: '0.0005 BNB',
        timeLimit: 12 // 小时
      },
      
      // 正确答案
      correctAnswer: 'no', // 不应该确认交易
      
      // 危险信号
      dangerSignals: {
        chinese: [
          '🚨 無限授權 (2^256 - 1) - 極度危險！',
          '⚠️ 發送者是未知合約地址',
          '❗ 不需要支付 gas 卻要求授權',
          '⏰ 製造時間壓力（12小時限制）',
          '🎁 免費空投誘餌',
          '🔒 approve 函數可以轉走你的所有代幣'
        ],
        english: [
          '🚨 Unlimited Approval (2^256 - 1) - Extremely Dangerous!',
          '⚠️ Sender is unknown contract address',
          '❗ No gas payment required but requesting approval',
          '⏰ Creating time pressure (12-hour limit)',
          '🎁 Free airdrop bait',
          '🔒 approve function can transfer all your tokens'
        ]
      },
      
      // 教育内容
      education: {
        chinese: {
          title: '什麼是授權陷阱？',
          description: 'approve() 函數允許合約從你的錢包轉移代幣。無限授權意味著攻擊者可以隨時轉走你所有的該代幣！',
          tips: [
            '永遠不要授權無限額度（2^256 - 1）',
            '只授權你需要的確切數量',
            '定期檢查並撤銷舊的授權',
            '警惕「免費空投」誘餌',
            '仔細查看合約調用詳情'
          ]
        },
        english: {
          title: 'What is an Approval Trap?',
          description: 'The approve() function allows a contract to transfer tokens from your wallet. Unlimited approval means attackers can transfer all your tokens at any time!',
          tips: [
            'Never approve unlimited amount (2^256 - 1)',
            'Only approve the exact amount you need',
            'Regularly check and revoke old approvals',
            'Beware of "free airdrop" baits',
            'Carefully review contract call details'
          ]
        }
      }
    }
  }
};

/**
 * 根据挑战ID获取挑战配置
 * @param {string} type - 挑战类型 (addressPoisoning, phishing, etc.)
 * @param {string} id - 挑战ID (level1-2, level2-1, etc.)
 * @returns {object} 挑战配置对象
 */
export const getChallengeConfig = (type, id) => {
  return challengesConfig[type]?.[id] || null;
};

/**
 * 获取所有挑战列表
 * @returns {array} 所有挑战的数组
 */
export const getAllChallenges = () => {
  const challenges = [];
  Object.keys(challengesConfig).forEach(type => {
    Object.keys(challengesConfig[type]).forEach(id => {
      challenges.push(challengesConfig[type][id]);
    });
  });
  return challenges;
};

