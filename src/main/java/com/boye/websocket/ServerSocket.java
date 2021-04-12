/*package com.boye.websocket;

import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import com.boye.websocket.XMLReader;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
@ServerEndpoint("/server")
public class ServerSocket {
	public ArrayList<Session> listOfSes = new ArrayList<Session>();
	@OnOpen
	public void open(Session session) throws IOException {
		listOfSes.add(session);
		System.out.println(listOfSes.size());
		String toSend = "(newAccount):args:" + Storage.returnNameByInt(0);
		session.getBasicRemote().sendText(toSend);
		/*
		 * try { File fXmlFile = new
		 * File("/home/matyas/eclipse/workspace/the_shrug/WebContent/WEB-INF/users.xml")
		 * ; DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		 * DocumentBuilder dBuilder = dbFactory.newDocumentBuilder(); Document doc =
		 * dBuilder.parse(fXmlFile); doc.getDocumentElement().normalize(); NodeList
		 * nList = doc.getElementsByTagName("user"); for (int temp = 0; temp <
		 * nList.getLength(); temp++) { Node nNode = nList.item(temp); if
		 * (nNode.getNodeType() == Node.ELEMENT_NODE) { Element eElement = (Element)
		 * nNode; System.out.println("Staff id : " + eElement.getAttribute("id"));
		 * System.out.println("Nick : " +
		 * eElement.getElementsByTagName("username").item(0).getTextContent()); } } }
		 * catch (Exception e) { e.printStackTrace(); }
		 *
	}

	@OnClose
	public void close(Session session) {
		/*System.out.println("yes");
		int position = listOfSes.indexOf(session);
		listOfSes.remove(position);*
	}

	@OnError
	public void onError(Throwable error) {
		System.out.println(error);
	}

	@OnMessage
	public void onMessage(Session session, String msg) throws EncodeException, IOException {
		try {
			String test = msg.split("content:")[1].split(";")[0];
			String arguments = msg.split("content:")[1].split(";")[1];
			/*
			 * String[] arwiwi = Storage.returnArrayOfNames(); for(String thE : arwiwi) {
			 * System.out.println(thE); }
			 *
			switch (test) {
			case "mouseMove": {
				String toReturn = "(mouseMove):" + arguments;
				try {
					/*for (Session sessi : session.getOpenSessions()) {
						if (sessi.isOpen()) {
							System.out.println(sessi);
							sessi.getBasicRemote().sendText(toReturn);
						}
					}*
					for(Session ses : listOfSes) {
						if(ses.isOpen()) {
							ses.getBasicRemote().sendText(toReturn);
						}
					}
				} catch (IOException e) {
					e.printStackTrace();
				}
				break;
			}
			case "sessionOpen": {
				String toReturn = "(newAccount):" + arguments;
				System.out.println(Storage.returnName(arguments));
				try {
					/*for (Session sessi : session.getOpenSessions()) {
						if (sessi.isOpen()) {
							System.out.println(sessi);
							sessi.getBasicRemote().sendText(toReturn);
						}
					}*
					for(Session ses : listOfSes) {
						if(ses.isOpen()) {
							ses.getBasicRemote().sendText(toReturn);
						}
					}
				} catch (IOException e) {
					e.printStackTrace();
				}
				break;
			}
			case "logIn": {
				String ret = XMLReader.returnUser(arguments);
				String toReturn = ret;
				if (ret.equals("404")) {
					ret = XMLReader.returnUser(arguments);
				}
				if (!ret.contains("404")) {
					String toStore = ret.split(", ")[1];
					Storage.setName(toStore);
					toReturn = "(logIn200):" + ret;
				}
				session.getBasicRemote().sendText(toReturn);
				break;
			}
			case "checkIfLogged": {

				break;
			}
			case "returnThoseAlive": {
				String[] tot = Storage.returnArrayOfNames();
				String toReturn = (String) String.join(", ", tot);
				session.getBasicRemote().sendText(toReturn);
				break;
			}
			case "mouseClick": {
				String toReturn = "(mouseClick):" + arguments;
				/*for (Session sessi : session.getOpenSessions()) {
						if (sessi.isOpen()) {
							System.out.println(sessi);
							sessi.getBasicRemote().sendText(toReturn);
						}
					}*
					for(Session ses : listOfSes) {
						if(ses.isOpen()) {
							ses.getBasicRemote().sendText(toReturn);
						}
					}
				break;
			}
			default: {
				String toReturn = "not found";
				session.getBasicRemote().sendText(toReturn);
			}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static String[] GetStringArray(ArrayList<String> arr) {
		String str[] = new String[arr.size()];
		for (int j = 0; j < arr.size(); j++) {
			str[j] = arr.get(j);
		}
		return str;
	}
}/*

class Storage {
	static ArrayList<String> names = new ArrayList<String>();

	public static String returnNameByInt(int n) {
		String toReturn = "404";
		try {
			if (names.isEmpty())
				return "404";
			toReturn = names.get(n);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return toReturn;
	}

	public static String returnName(String name) {
		String toReturn = "404";
		try {
			for (int i = 0; i < names.size(); i++) {
				String pat = names.get(i);
				if (pat.equals(name)) {
					toReturn = pat;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return toReturn;
	}

	public static void setName(String name) {
		try {
			names.add(name);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static String[] returnArrayOfNames() {
		if (names.isEmpty())
			return null;
		String[] array = new String[names.size()];
		try {
			for (int i = 0; i < names.size(); i++) {
				String name = names.get(i);
				array[i] = name;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return array;
	}
}*/

